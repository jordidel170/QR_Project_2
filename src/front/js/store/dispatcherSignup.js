import React from 'react'



const signupDispatcher = async (restaurantName,firstName, lastName, email, password) => {
    const requestBody = {
        "restaurant name": restaurantName,
        "first name": firstName,
        "last name": lastName,
        "email": email,
        "password": password,
    }
    const response = await fetch(`http://127.0.0.1:5000/app/register`, { 
         method: "POST",
         headers: { "Content-Type": "application/json" },
         CORS:'Access-Control-Allow-Origin',
         body: JSON.stringify(requestBody) 
    })
    console.log(response)
    if(!response.ok) throw Error("Hay un error en los datos")
   
    const data = await response.json()
    console.log("Usuario registrado con éxito:", data)
    // Guarda el token en el LocalStorage
  
   
    return data
}

export default signupDispatcher

