import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	

	// const handleLogin = () => {
	// 	const response = {
	// 		method: 'POST',
	// 		headers: {
	// 			"Content-type":"application/json"
	// 		},
	// 		CORS: 'Access-Control-Allow-Origin',
	// 		body: JSON.stringify({
	// 			"email": email,
	// 			"password": password
	// 		})
	// 	}
	// 	fetch('https://urban-invention-x559rxpg57j63vrg-3001.app.github.dev/api/login', response)
	// 	.then(response => {
	// 		if(response.status === 200) return response.json();
	// 		else alert("There has been an error", response.status)
	// 	})
	// 	.then(data => {
	// 		sessionStorage.setItem("token", data.token)
	// 	})
	// 	.catch(error => {
	// 		console.log("There was an error", error)
	// 	})
	// }

	const handleLogin = () => {
		actions.getTokenLogin(email, password).then( () => {
			history.pushState("/")
		})
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