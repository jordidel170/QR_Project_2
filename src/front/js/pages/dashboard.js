import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, Outlet } from "react-router-dom"
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import mesasImage from '../../img/mesas.png';

const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // const [checkboxChecked, setCheckboxChecked] = useState(false)
    const navigate = useNavigate();
    const [token, setToken] = useState()
    const [isMounted, setIsMounted] = useState(true)

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
            // Check token after login attempt
            const localStoraged = localStorage.getItem("token")
            if (localStoraged) {
                navigate("/app/home");
                setToken(localStoraged)
            }
        }
    };

    // useEffect(() => {
    //     actions.syncTokenLocalStorage();
    //     if (localStorage.getItem("token")) {
    //         navigate("/app/login/home");
    // 		console.log("if")
    //     }

    // 	return () => {
    // 		setIsMounted(false)
    // 	}
    // }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleSectionCreateAccount = () => {
        navigate("/app/signup")
    }

    return (
        <>
            <section>
                <div className="container-login">
                    <h1>Dashboard</h1>
                    <div className="iconos-dashboard">
                        <div className="icono">
                            <i className="icono-mesas"></i>
                            <p>Mesas</p>
                        </div>
                        <div className="icono">
                            <i className="icono-carta"></i> {/* Reemplazar con el icono correspondiente */}
                            <p>Carta</p>
                        </div>
                        <div className="icono">
                            <i className="icono-facturacion"></i> {/* Reemplazar con el icono correspondiente */}
                            <p>Facturación</p>
                        </div>
                        <div className="icono">
                            <i className="icono-configuracion"></i> {/* Reemplazar con el icono correspondiente */}
                            <p>Configuración</p>
                        </div>
                    </div>
                </div>
            </section>
        </>


    );

};
export default Dashboard


