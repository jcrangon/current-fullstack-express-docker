
import { Request, Response } from "express";
import { prisma } from "../db/postgres";
import { User } from "../types/user";
import { comparePassword, hashPassword } from "../utils/password";
import { signAccessToken, signRefreshToken } from "../utils/jwt";
import { env } from "../config/env";
import jwt from "jsonwebtoken"
import { email } from "zod/v4";

export async function register( req: Request, res: Response) {
    const { email: email, name: name, password: password }  = req.body;
    const exists: User | null = await prisma.user.findUnique({
        where: { email }
    });

    if(exists) {
        return res.status(409).json({ error: "User already exists" });
    }
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: await hashPassword(password)
        },
        select: { id: true, email: true, name: true, createdAt: true, updatedAt: true }
    });
    return res.status(201).json(user);
}

export async function login( req: Request, res: Response) {
    const { email, password } = req.body;
    const user: User | null = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const accessToken = signAccessToken({ sub: user.id, email: user.email });
    const refreshToken = signRefreshToken({ sub: user.id})

    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
        }
    });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 2 * 60 * 1000 // 2m
    })

    return res.status(200).json({
        message: "Login successful",
        refreshToken: refreshToken,
        user: { id: user.id, email: user.email, name: user.name }
    });
}

export async function refreshToken(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "Missing Refresh token" });
    }

    let payload;

    try {
      payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as any;

    } catch (err) {
      // token invalide
      await prisma.refreshToken.delete({
        where: { token: refreshToken }
      });
      return res.status(401).json({ error: "Invalid Refresh token" });
    }

    // on recupere l'id du user dans le token
    const userId = Number(payload.sub);

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken, userId: userId }
    });
    
    if (!storedToken) {
      return res.status(401).json({ error: "Refresh token not found" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if(!user || !user.email) {
      return res.status(401).json({ error: "User or email not found" });
    }

    const userEmail = user.email;

    // on crée deux token tout neufs
    const accessToken = signAccessToken({ sub: userId, email: userEmail });
    const newRefreshToken = signRefreshToken({ sub: userId });

    await prisma.refreshToken.update({
      where: { token: refreshToken },
      data: { 
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
    }
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 2 * 60 * 1000 // 2m
    });

    return res.status(200).json({ 
        message: "Refresh successful", 
        refreshToken: newRefreshToken,
        user: { id: user.id, email: user.email, name: user.name }
    });

  } catch (err: any) {
    return res.status(500).json({ error: "Internal server error" });
  }

}

export async function me(req: Request, res: Response) {
  const access = req.cookies['accessToken'];

  if (!access) return res.status(401).json({ error: "Unauthenticated" });

  const payload: any = jwt.verify(access, env.JWT_ACCESS_SECRET);

  const user = await prisma.user.findUnique({
    where: { id: Number(payload.sub) },
    select: { id: true, email: true, name: true }
  });
  return res.json({ user });
}

export async function logout( req: Request, res: Response) {
    try {
        res.clearCookie("accessToken");
        return res.status(200).json({ message: "Logout successful" });
    } catch(err: any) {
        console.error("Logout Malfunction : ", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

