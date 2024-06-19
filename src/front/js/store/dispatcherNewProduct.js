import react from 'react'


const newProductDispatcher = async (name, price, description, image, category) => {
    const requestBody = {
        "name" : name,
        "price" : price,
        "description": description,
        "image": image,
        "category": category
    }
    const response = await fetch(`http://127.0.0.1:5000/app/products/createproduct`, { 
         method: "POST",
         headers: { "Content-Type": "application/json" },
         CORS:'Access-Control-Allow-Origin',
         body: JSON.stringify(requestBody) 
    })
    console.log(response)
    if(!response.ok) throw Error("Hay un error en los datos")
   
    const data = await response.json()
    console.log("Product creado con éxito", data)
    
  
   
    return data
}

export default newProductDispatcher

