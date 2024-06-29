import react from 'react'


const dispatcherTable = {
 create_table: async (newTable) => {
    // const requestBody = {
    //    "table_number": table_number,
    //    "position_x": position_x,
    //    "position_y": position_y

    // }
    const response = await fetch(`http://127.0.0.1:5000/app/tables`, { 
         method: "POST",
         headers: { "Content-Type": "application/json" },
         CORS:'Access-Control-Allow-Origin',
         body: JSON.stringify(newTable) 
    })
    console.log(response)
    if(!response.ok) throw Error("table_number is required", 400)
   
    const data = await response.json()
    console.log("Table creada con éxito", data)
    
    return data
}, 
 delete_table: async(table_id) => {
    const response = await fetch(`http://127.0.0.1:5000/app/tables/${table_id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        CORS:'Access-Control-Allow-Origin',
    })
    console.log(response)
    if(!response.ok) throw Error ("No se ha podido eliminar la mesa")
        const data = await response.json()
    console.log("Mesa eliminada con éxito", data)
    return data;
 },

 getTableList: async () => {
    const response = await fetch('http://127.0.0.1:5000/app/tables', {
        method: 'GET',
        headers: {'Content-Type' : 'application/json'},
        CORS:'Access-Control-Allow-Origin',
    })
    
    if(!response.ok) throw Error("There are no tables")

        const data = await response.json()
        return data;
 },

 updateTablePosition: async (id, position) => {
    const response = await fetch(`http://127.0.0.1:5000/app/tables/${id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        CORS:'Access-Control-Allow-Origin',
        body: JSON.stringify({ position_x: position.x, position_y:position.y })
    });
    if(!response.ok) throw Error("Error updating table positions")
    
        const data = await response.json();
    return data;
 }

}   


export default dispatcherTable

