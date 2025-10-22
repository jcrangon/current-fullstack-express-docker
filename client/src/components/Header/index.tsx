import { useState } from "react";
import Logo from "../Logo";
import TopNav from "../TopNav";
import { Container } from "./style";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";


export default function Header() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleRegister = () => {
        navigate("/register");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <Container>
            <Logo />
            <TopNav />
            <div className="connexion">
                {isAuthenticated ? (
                    <>
                        <span>Salut, {user?.name}</span>
                        <button onClick={handleLogout}>Log Out</button>
                    </>
                ) : (
                    <>
                        <button onClick={handleRegister}>Register</button>

                        <button onClick={handleLogin}>Log In</button>
                    </>
                )}
            </div>
        </Container>
    );
}