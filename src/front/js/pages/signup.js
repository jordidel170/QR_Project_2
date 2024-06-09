import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import { Navigate, useNavigate } from "react-router-dom";

const Signup = () => {
const {store, actions} = useContext(Context)
const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [validatedPassword, setValidatedPassword] = useState("")
const [restaurantName, setRestaurantName] = useState("")
const [showPassword, setShowPassword] = useState(false);
const [registerStatus, setRegisterStatus] = useState()
const Navigate = useNavigate()

const handleSubmit = async (event) => {
    event.preventDefault();
    // Validaciones antes de enviar los datos
    if ( !restaurantName || !firstName || !lastName|| !email || !password){
        alert("All fields are required."); 
    } else {
       
       const data = await actions.getUserRegister(firstName,lastName,restaurantName,email,password);
       setRegisterStatus(data[0].status)
    }
}

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
}

const handleOnClick = () => {
    Navigate("/api/login")
}

    return (
             <>
              <section>
                {registerStatus === "ok"? (  <div class="container2">
            <div class="content">
                <h1>USUARIO REGISTRADO CON ÉXITO!</h1>
                <button onClick={handleOnClick}>Ir a Login</button>
            </div>
        </div>
                           ) :
                            
                       <div className="container">
                       <div className="formulario inputlogin">
                           <form action="#">
                               <h1>Sign up</h1>
                               <div className="input-container">
                               <i className="fa-solid fa-utensils"></i>
                                       <input type="text"  value={restaurantName} onChange={(event) => { setRestaurantName(event.target.value); }} required></input>
                                       <label for="#">Nombre del Restaurante</label>
                                       </div>
                               <div className="input-container">
                               <i className="fa-solid fa-user"></i>
                                       <input type="text"  value={firstName} onChange={(event) => { setFirstName(event.target.value); }} required></input>
                                       <label for="#">Nombre</label>
                               </div>
                               <div className="input-container">
                               <i className="fa-regular fa-user"></i>
                                       <input type="text"  value={lastName} onChange={(event) => { setLastName(event.target.value); }} required></input>
                                       <label for="#">Apellidos</label>
                               </div>
                                   <div className="input-container">
                                       <i className="fa-solid fa-envelope"></i>
                                       <input type="email" value={email} onChange={(event) => { setEmail(event.target.value); }} required></input>
                                       <label for="email">Email</label>
                                   </div>
                                      
                                   <div className="input-container password">
                                       <i className={`fa-solid ${showPassword ? 'fa-lock-open' : 'fa-lock'}`} onClick={togglePasswordVisibility}></i>
                                       <input type={showPassword ? "text" : "password"}  minlength="8" maxlength="12" value={password} onChange={(event) => { setPassword(event.target.value); }} required></input>
                                           <label for="#">Contraseña</label>
                                       </div>
                                       <div className="input-container password">
                                       <i className={`fa-solid ${showPassword ? 'fa-lock-open' : 'fa-lock'}`} onClick={togglePasswordVisibility}></i>
                                       <input type={showPassword ? "text" : "password"}  value={validatedPassword} onChange={(event) => { setValidatedPassword(event.target.value); }} required></input>
                                           <label for="#">Repetir contraseña</label>
                                       </div>
                                      
                               </form>
                               <div>
                                   <button className="r6" onClick={handleSubmit}>Registro</button>
                               </div>
                           
                           
                       </div>
                   </div>
               
                }
                </section>
     
    
                        
    </>
)

}


export default Signup