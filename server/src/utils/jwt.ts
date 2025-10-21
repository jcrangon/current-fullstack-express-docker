import jwt from "jsonwebtoken"
import { env } from "../config/env"
import ms from "ms"

export const signAccessToken = (payload: object) =>
    jwt.sign(
        payload,
        env.JWT_ACCESS_SECRET,
        { expiresIn: env.ACCESS_TOKEN_TTL as ms.StringValue || "2m" }
    )

export const signRefreshToken = (payload: object) =>
    jwt.sign(
        payload,
        env.JWT_REFRESH_SECRET,
        { expiresIn: env.REFRESH_TOKEN_TTL as ms.StringValue || "5m" }
    )