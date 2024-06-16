
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, Outlet } from "react-router-dom"
import { Context } from "../store/appContext";
import "../../styles/login.css";


const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false);
	// const [checkboxChecked, setCheckboxChecked] = useState(false)
	const navigate = useNavigate();
	const [token, setToken] = useState()
	const [isMounted, setIsMounted] = useState(true)
	
	const handleLogin = async () => {
        await actions.getTokenLogin(email, password);
        // Check token after login attempt
		const localStoraged = localStorage.getItem("token")
        if (localStoraged) {
            navigate("/app/home");
			setToken(localStoraged)
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
				<div className="formulario inputlogin">
					{/* {store.token && store.token != "" && store.token != undefined ? navigate("/app/login/home") :(  */}
						
					<form action="#" method="POST">
						<h1>Iniciar Sesión</h1>
						
							<div className="input-container">
								<i className="fa-solid fa-envelope"></i>
								<input type="email" value={email} onChange={(event) => { setEmail(event.target.value); }} required></input>
								<label for="Email">Email</label>
							</div>

								<div className="input-container">
								<i className={`fa-solid ${showPassword ? 'fa-lock-open' : 'fa-lock'}`} onClick={togglePasswordVisibility}></i>
								<input type={showPassword ? "text" : "password"}  value={password} onChange={(event) => { setPassword(event.target.value); }} required></input>
									<label for="Contraseña">Contraseña</label>
								</div>

								<div className="olvidar">
									<label for="forgotPassword">
										<input type="checkbox"/> Recordar 
										{/* <a href="#">Olvidé la contraseña</a> */}
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
		</section>
	

		</>
		
		
	);

};
export default Login


