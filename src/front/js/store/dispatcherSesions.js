import React from "react";

// Desde este dispatcher se hace la llamada fetch al (lo que debería ser) la base de datos, hace un request y a través del body se pasa la info a confirmar,
// si está confirmada regresa el token.
// Se le pasa el email y el password como argumento para indicar que es lo que va a recibir como parametro.
const sesionsDispatcher = {
  assing_client: async (idTable, idClient) => {
    const response = await fetch(
      `http://127.0.0.1:5000/app/tables/${idTable}/${idClient}/client`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) throw Error("There are no products");

    if (response.status === 401) {
      throw "Invalid credentials";
    } else if (response.status === 400) {
      throw "Invalid email or password format";
    }
    const data = await response.json();
    // console.log(data)
    return data;
  },

  create_client: async (name) => {
    const requestBody = {
      name: name,
    };
    const response = await fetch(`http://127.0.0.1:5000/app/client/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      CORS: "Access-Control-Allow-Origin",
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) throw Error("There are no products");

    if (response.status === 401) {
      throw "Invalid credentials";
    } else if (response.status === 400) {
      throw "Invalid email or password format";
    }
    const data = await response.json();
    // console.log(data)
    return data;
  },
  put: async (id, name, price, description, image, category) => {
    const response = await fetch(`http://127.0.0.1:5000/app/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        price: price,
        description: description,
        image: image,
        category: category,
      }),
    });

    if (!response.ok) throw Error("There are no products");

    if (response.status === 401) {
      throw "Invalid credentials";
    } else if (response.status === 400) {
      throw "Invalid email or password format";
    }
    const data = await response.json();
    // console.log(data)
    return data;
  },
  get: async () => {
    const response = await fetch(`http://127.0.0.1:5000/app/sessions`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  },
  add_product_to_session: async (tableId, items) => {
    const reqBody = {
      items: items,
    };
    console.log("en dispatcher BODY: ", reqBody);
    const response = await fetch(
      `http://127.0.0.1:5000/app/sessions/${tableId}/products`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        CORS: "Access-Control-Allow-Origin",
        body: JSON.stringify(reqBody),
      }
    );
    return await response.json();
  },

get_session_active: async (tableId) => {
  const response = await fetch(`http://127.0.0.1:5000/app/sessions/${tableId}/active`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}
};

export default sesionsDispatcher;