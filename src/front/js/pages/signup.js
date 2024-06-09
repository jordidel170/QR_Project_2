import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const Signup = () => {
const {store, actions} = useContext(Context)
const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [validatedPassword, setValidatedPassword] = useState("")
const [restaurantName, setRestaurantName] = useState("")
const [disable, setDisable] = useState(false)
const [showPassword, setShowPassword] = useState(false);

const handleSubmit = async (event) => {
    event.preventDefault();
    // Validaciones antes de enviar los datos
    if ( !restaurantName || !firstName || !lastName|| !email || !password){
        alert("All fields are required."); 
        setDisable(true)
        setDisable(false)
    } else {
        setDisable(false)
       const userRegister = await actions.getUserRegister(firstName,lastName,restaurantName,email,password);
    }
}

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
}


    return (
             <>
               <section>
        <div className="container">
            <div className="formulario inputlogin">
                <form action="#">
                    <h1>Sign up</h1>
                    <div className="input-container">
                    <i className="fa-solid fa-utensils"></i>
                            <input type="text" required value={restaurantName} onChange={(event) => { setRestaurantName(event.target.value); }}></input>
                            <label for="#">Nombre del Restaurante</label>
                            </div>
                    <div className="input-container">
                    <i className="fa-solid fa-user"></i>
                            <input type="text" required value={firstName} onChange={(event) => { setFirstName(event.target.value); }}></input>
                            <label for="#">Nombre</label>
                    </div>
                    <div className="input-container">
                    <i className="fa-regular fa-user"></i>
                            <input type="text" required value={lastName} onChange={(event) => { setLastName(event.target.value); }}></input>
                            <label for="#">Apellidos</label>
                    </div>
                        <div className="input-container">
                            <i className="fa-solid fa-envelope"></i>
                            <input type="email" required value={email} onChange={(event) => { setEmail(event.target.value); }}></input>
                            <label for="#">Email</label>
                        </div>
                           
                        <div className="input-container password">
                            <i className={`fa-solid ${showPassword ? 'fa-lock-open' : 'fa-lock'}`} onClick={togglePasswordVisibility}></i>
                            <input type={showPassword ? "text" : "password"} required value={password} onChange={(event) => { setPassword(event.target.value); }}></input>
                                <label for="#">Contraseña</label>
                            </div>
                            <div className="input-container password">
                            <i className={`fa-solid ${showPassword ? 'fa-lock-open' : 'fa-lock'}`} onClick={togglePasswordVisibility}></i>
                            <input type={showPassword ? "text" : "password"} required value={validatedPassword} onChange={(event) => { setValidatedPassword(event.target.value); }}></input>
                                <label for="#">Repetir contraseña</label>
                            </div>
                           
                    </form>
                    <div>
                        <button className="r6" onClick={handleSubmit}>Registro</button>
                    </div>
                
                
            </div>
        </div>
    </section>
    
    </>
)

}


export default Signup