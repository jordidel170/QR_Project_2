import React, { useState } from 'react';

const Mesas = () => {
    const [mesas, setMesas] = useState([]);

    const agregarMesa = () => {
        const nuevaMesa = {
            id: mesas.length + 1,
            nombre: `Mesa ${mesas.length + 1}`,
            posicion: { x: 50, y: 50 }, // Posición inicial de la mesa dentro del contenedor
        };
        setMesas([...mesas, nuevaMesa]);
    };

    const moverMesa = (id, nuevaPosicion) => {
        setMesas(mesas.map(mesa => {
            if (mesa.id === id) {
                return { ...mesa, posicion: nuevaPosicion };
            }
            return mesa;
        }));
    };

    const iniciarArrastre = (e, id) => {
        e.dataTransfer.setData("text/plain", id);
    };

    const permitirSoltar = (e) => {
        e.preventDefault();
    };

    const manejarSoltar = (e) => {
        e.preventDefault();
        const contenedor = e.target.getBoundingClientRect();
        const id = e.dataTransfer.getData("text");
        const nuevaPosicion = {
            x: e.clientX - contenedor.left,
            y: e.clientY - contenedor.top
        };
        moverMesa(parseInt(id), nuevaPosicion);
    };

    return (
        <div
            className="sala"
            style={{ width: '400px', height: '400px', position: 'relative', border: '1px solid black' }}
            onDragOver={permitirSoltar}
            onDrop={manejarSoltar}
        >
            {mesas.map((mesa) => (
                <div
                    key={mesa.id}
                    draggable
                    onDragStart={(e) => iniciarArrastre(e, mesa.id)}
                    style={{ position: 'absolute', left: mesa.posicion.x, top: mesa.posicion.y }}
                >
                    {mesa.nombre}
                </div>
            ))}
            <button onClick={agregarMesa}>Agregar Mesa</button>
        </div>
    );
};

export default Mesas;


