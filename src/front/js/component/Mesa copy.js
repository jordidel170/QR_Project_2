import React, { useState } from 'react';
import mesagreen from "../../img/mesagreen.png"
import mesaYellow from "../../img/mesaYellow.png"



const Mesa = ({ mesa, onClick, angulo }) => {
    // Agrega un estado para rastrear si la mesa está seleccionada
    const [isSelected, setIsSelected] = useState(false);

    // Determina qué imagen mostrar basado en si la mesa está seleccionada
    const mesaImage = isSelected ? mesaYellow : (mesa.isActive ? mesagreen : mesa.icono);

    // Actualiza el manejador de clics para cambiar el estado de isSelected
    const handleClick = (e) => {
        onClick(e); // Llama a la función onClick proporcionada como prop si es necesario
        setIsSelected(!isSelected); // Cambia el estado de isSelected
    };
    return (
        <div
            style={{
                color: 'white',
                position: 'absolute',
                left: `${mesa.posicion.x}px`,
                top: `${mesa.posicion.y}px`,
                visibility: 'visible'
            }}
            className="mesa-container"
            onClick={handleClick}
        >
            <img
                
                src={mesaImage}
                alt="Mesa"
                
                style={{
                    width: '60px',
                    height: '60px',
                    transform: `rotate(${angulo || 0}deg)`,
                    transition: 'transform 0.3s ease-in-out'
                }}
            />
            <div className="numeroMesa">{mesa.table_number}</div>
        </div>
    );
};

export default Mesa;