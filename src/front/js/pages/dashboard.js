import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, Outlet } from "react-router-dom";
import { Context } from "../store/appContext";
import { Html5QrcodeScanner } from "html5-qrcode";
import "../../styles/login.css";

const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [token, setToken] = useState();
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        // Initialize QR Code scanner
        const html5QrcodeScanner = new Html5QrcodeScanner(
            "reader", { fps: 10, qrbox: 250 });
        html5QrcodeScanner.render(onScanSuccess, onScanError);

        return () => {
            html5QrcodeScanner.clear();
        };
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !password) {
            alert("Todos los campos son obligatorios.");
        } else if (!emailRegex.test(email)) {
            alert("El email es incorrecto.");
        } else if (password.length < 8 || password.length > 12) {
            alert("La contraseña debe tener entre 8 y 12 caracteres.");
        } else {
            await actions.getTokenLogin(email, password);
            const localStoraged = localStorage.getItem("token");
            if (localStoraged) {
                navigate("/app/home");
                setToken(localStoraged);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSectionCreateAccount = () => {
        navigate("/app/signup");
    };

    const onScanSuccess = (decodedText, decodedResult) => {
        alert(`Código QR escaneado: ${decodedText}`);
        // Handle the scanned code as needed
    };

    const onScanError = (errorMessage) => {
        console.error(errorMessage);
    };

    return (
        <>
            <section>
                <div className="container-login">
                    <div className="formulario inputlogin">
                        <form action="#">
                            <h1>Iniciar Sesión</h1>
                            <div className="input-container">
                                <i className="fa-solid fa-envelope"></i>
                                <input type="text, email" value={email} onChange={(event) => { setEmail(event.target.value); }} required></input>
                                <label htmlFor="Email">Email</label>
                            </div>
                            <div className="input-container password">
                                <i className={`fa-solid ${showPassword ? 'fa-lock-open' : 'fa-lock'}`} onClick={togglePasswordVisibility}></i>
                                <input type={showPassword ? "text" : "password"} value={password} onChange={(event) => { setPassword(event.target.value); }} required></input>
                                <label htmlFor="Contraseña">Contraseña</label>
                            </div>
                            <div className="olvidar">
                                <label htmlFor="forgotPassword">
                                    <input type="checkbox" /> Recordar
                                </label>
                            </div>
                        </form>
                        <div>
                            <button className="r6" onClick={handleLogin}>Acceder</button>
                            <div className="registrar">
                                <p>No tienes cuenta? </p>
                                <button onClick={handleSectionCreateAccount}>Crea una Cuenta</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="reader" style={{ width: "500px" }}></div>
            </section>
        </>
    );
};

export default Dashboard;


