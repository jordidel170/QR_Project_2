import React from 'react';
import mesagreen from "../../img/mesagreen.png"
import mesaYellow from "../../img/mesaYellow.png"

const Mesa = ({ mesa, isSelected, onClick, angulo }) => {
    const mesaImage = isSelected ? mesaYellow : (mesa.isActive ? mesagreen : mesa.icono);

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
            onClick={onClick}
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