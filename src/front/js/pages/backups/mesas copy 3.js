import React, { useState } from 'react';
import "../../styles/signup.css";
import rigoImageUrl from "../../img/mesas.png";

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
        e.dataTransfer.setDragImage(e.target, 25, 25);
    };

    const permitirSoltar = (e) => {
        e.preventDefault();
    };

    const manejarSoltar = (e) => {
        e.preventDefault();
        const contenedor = e.target.getBoundingClientRect();
        const id = e.dataTransfer.getData("text");
        // Ajuste para centrar el icono en la posición del cursor
        const ajusteX = 25; // La mitad del ancho del icono
        const ajusteY = 25; // La mitad del alto del icono
        const nuevaPosicion = {
            x: e.clientX - contenedor.left - ajusteX,
            y: e.clientY - contenedor.top - ajusteY
        };
        moverMesa(parseInt(id), nuevaPosicion);
    };

    return (
        <>
            <section>
                <div>
                    <img src={rigoImageUrl} />
                    <button onClick={agregarMesa}>Agregar Mesa</button>
                </div>
                <div
                    className="sala container"
                    style={{ width: '800px', height: '400px', position: 'relative', border: '1px solid black' }}
                    onDragOver={permitirSoltar}
                    onDrop={manejarSoltar}
                >
                    {mesas.map((mesa) => (
                        <div
                            key={mesa.id}
                            draggable
                            onDragStart={(e) => iniciarArrastre(e, mesa.id)}
                            style={{ color: 'white', position: 'absolute', left: mesa.posicion.x, top: mesa.posicion.y }}
                        >
                            <img src={rigoImageUrl} alt="Mesa" style={{ width: '50px', height: '50px' }} />
                            <div>{mesa.nombre}</div>
                        </div>
                    ))}

                </div>
            </section>
        </>
        );
};

export default Mesas;


