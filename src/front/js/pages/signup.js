import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import { Navigate, useNavigate } from "react-router-dom";
import Login from './login';

const Signup = () => {
const {store, actions} = useContext(Context)
const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [validatedPassword, setValidatedPassword] = useState("")
const [restaurantName, setRestaurantName] = useState([
    "Restaurante A",
    "Restaurante B",
    "Restaurante C",
    "Restaurante D"
])
const [selectedRestaurant, setSelectedRestaurantName] = useState()
const [showPassword, setShowPassword] = useState(false);
const [registerStatus, setRegisterStatus] = useState()
const Navigate = useNavigate()
const [isLoading, setIsLoading] = useState(false)
const [token, setToken] = useState()

const handleSubmit = async (event) => {
    event.preventDefault();
    if ( !selectedRestaurant || !firstName || !lastName|| !email || !password){
        alert("All fields are required."); 
    } else {
       setIsLoading(true)
       const data = await actions.getUserRegister(selectedRestaurant,firstName,lastName,email,password);
       setRegisterStatus(data[0].status)
       if (data[0].status === "ok"){
        console.log("if")
        setIsLoading(false)

        setTimeout( async() => {
            setIsLoading(true)
        await actions.getTokenLogin(email, password)
        const tokenLocalStoraged = localStorage.getItem("token")
        if (tokenLocalStoraged) {
            setTimeout( () => {
                setIsLoading(false)
                Navigate("/app/home");
                setToken(tokenLocalStoraged)}, 3000)
        } 
        },2000)
        
       }
    }
}

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
}


const handleSelectChange = (event) => {
    setSelectedRestaurantName(event.target.value)
   
}

    return (
             <>

              <section>
                {isLoading === true ? (<div class="container-loading">
            <div class="loading">
              <div class="dots"></div>
              <div class="dots"></div>
              <div class="dots"></div>
              <span class="text-loading">Cargando...</span>
            </div>
          </div>): (
registerStatus === "ok" ? (  <div class="container2">
    <div class="content">
        <h1>USUARIO REGISTRADO CON ÉXITO!</h1>
    </div>
</div>
                   ) :
                    
               <div className="container">
               <div className="formulario inputlogin">
                   <form action="#" method="POST">
                       <h1>Sign up</h1>
                       <div className="input-container">
                       <i className="fa-solid fa-utensils"></i>
                       {/* <label htmlFor="restaurant-dropdown">Select a restaurant: </label> */}
                        <select className="restaurant-dropdown" value={selectedRestaurant} onChange={handleSelectChange}>
                            <option value="" disabled >Selecciona un Restaurante</option>
                            {restaurantName.map((name, index) => (<option key={index} value={name} onChange={handleSelectChange}>
                                {name}</option>))}</select>
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
                               <input type={showPassword ? "text" : "password"}  minLength="8" maxLength="12" value={password} onChange={(event) => { setPassword(event.target.value); }} required></input>
                                   <label for="#">Contraseña</label>
                               </div>
                               {/* <div className="input-container password">
                               <i className={`fa-solid ${showPassword ? 'fa-lock-open' : 'fa-lock'}`} onClick={togglePasswordVisibility}></i>
                               <input type={showPassword ? "text" : "password"}  value={validatedPassword} onChange={(event) => { setValidatedPassword(event.target.value); }} required></input>
                                   <label for="#">Repetir contraseña</label>
                               </div> */}
                              
                       </form>
                       <div className="register-button">
                           <button className="r6" onClick={handleSubmit}>Registro</button>
                           <p className="account">Ya tienes una cuenta? <Link to="/app/login">Inicia Sesión</Link></p>
                       </div>
                      
                   
               </div>
           </div>
       
          )}
           
        
                </section>
     
    
                        
    </>
)

}


export default Signup