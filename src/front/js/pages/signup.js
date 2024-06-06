import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const Signup = () => {
const {store, actions} = useContext(Context)
const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")


const handleSubmit = async (event) => {
    event.preventDefault();
    // Validaciones antes de enviar los datos
    if (!firstName || !lastName || !email || !password) {
        alert("All fields are required.");
        return;
    }}

    return (
             <>
                 <div className="container_signup">
                    <form onSubmit={handleSubmit}>
                        <input className="container_signup_firstName" type="text" placeholder="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)}></input>
                        <input className="container_signup_lastName" type="text" placeholder="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)}></input>
                        <input className="container_signup_email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                        <input className="container_signup_password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                        <button type="submit" onClick={actions.getUserRegister()}>Register</button>
                     </form>
                </div>
    
    </>
)

}

export default Signup
// const Signup = () => {
// 	const { store, actions } = useContext(Context);
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
	


// 	const handleLogin = () => {
// 		actions.getTokenLogin(email, password)
// 	}

// 	return (
// 		<>
// 		<div className="inputlogin">
// 			<h1>Login</h1>
// 			{(store.token && store.token != "" && store.token != undefined) ? "You are logged in" + store.token : 
			
// 			<div>
// 			<input type="text" placeholder="email" value={email}  onChange={(event) => {setEmail(event.target.value)}}></input>
// 			<input type="password" placeholder="password" value={password} onChange={(event) => {setPassword(event.target.value)}}></input>
// 			<button onClick={handleLogin}>Login</button>
// 			</div> 
// 			}
// 		</div>
// 		</>
// 	);

// };
// export default Signup