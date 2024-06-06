import React from 'react'

// Desde este dispatcher se hace la llamada fetch al (lo que debería ser) la base de datos, hace un request y a través del body se pasa la info a confirmar,   


const signupDispatcher = async (firstName, lastName, email, password) => {
    const response = await fetch(`https://urban-invention-x559rxpg57j63vrg-3001.app.github.dev/api/signup`, { 
         method: "POST",
         CORS: 'Access-Control-Allow-Origin',
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({  "firstName": firstName, "lastName": lastName, "email": email,
            "password": password  }) 
    })

    if(!response.ok) throw Error("There is an error in the register request")
      
    const data = await response.json()
    console.log("Usuario registrado con éxito:", data)
    // Guarda el token en la sessionStorage
    // También deberías almacenar el usuario en la store utilizando la función setItem
    sessionStorage.setItem("token", data.token);

    return data
}

export default signupDispatcher

