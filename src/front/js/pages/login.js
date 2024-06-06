import React, { useContext, useState, useHistory } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const Login = () => {
	// contexto global, con useContext me traigo actions para aplicar las funciones que se encuentran en el store.
	const { store, actions } = useContext(Context);
	// estado de los inputs 
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// history permite navegar a diferentes rutas programáticamente. Por ejemplo, si quieres redirigir al usuario a otra página después de un evento (como enviar un formulario), 
	const history = useHistory();
	


	const handleLogin = () => {
		actions.getTokenLogin(email, password)
	}

	return (
		<>
		<div className="inputlogin">
			<h1>Login</h1>
			{(store.token && store.token != "" && store.token != undefined) ? "You are logged in" + store.token : 
			
			<div>
			<input type="text" placeholder="email" value={email}  onChange={(event) => {setEmail(event.target.value)}}></input>
			<input type="password" placeholder="password" value={password} onChange={(event) => {setPassword(event.target.value)}}></input>
			<button onClick={handleLogin}>Login</button>
			</div> 
			}
		</div>
		</>
	);

};
export default Login