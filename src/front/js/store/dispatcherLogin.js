import React from 'react'


const loginDispatcher = {
    post: async(email, password) => {
        const response = await fetch('https://urban-invention-x559rxpg57j63vrg-3001.app.github.dev/api/login',{
            method: 'POST',
            headers: {"Content-type":"application/json"},
        CORS: 'Access-Control-Allow-Origin',
        body: JSON.stringify({
        "email": email,
        "password": password })
    });

    // if (response.status !== 200){
    //     alert("There has been an error", response.status);
    //     return false
    // }
        const data = await response.json();
        console.log("This came from the backend", data)
        sessionStorage.setItem("token", data.token);
        return true;
        // console.log(data)
        // return data;
}}  
// const loginDispatcher = ({email, password}) => {
//     const response = {
//         method: 'POST',
//         headers: {
//             "Content-type":"application/json"
//         },
//         CORS: 'Access-Control-Allow-Origin',
//         body: JSON.stringify({
//             "email": email,
//             "password": password
//         })
//     }
//     fetch('https://urban-invention-x559rxpg57j63vrg-3001.app.github.dev/api/login', response)
//     .then(response => {
//         if(response.status === 200) return response.json();
//         else alert("There has been an error", response.status)
//     })
//     .then(data => {
//         sessionStorage.setItem("token", data.token)
//     })
//     .catch(error => {
//         console.log("There was an error", error)
//     })
// }
export default loginDispatcher

