import React, { useEffect, useState } from 'react';
import iconoMesas from "../../img/icono-mesa.png";
import mesagreen from "../../img/mesagreen.png";
import "../../styles/caja.css"

const Mesa = ({ mesa, onClick, angulo, isSelected, onDeselect, updateMesaStatus }) => {
    const [icon, setIcon] = useState(iconoMesas);

    const handleClick = () => {
        if (isSelected) {
            onDeselect(); 
        } else {
            onClick(); 
            updateMesaStatus(mesa.table_number, 'occupied');
        }
    };

    useEffect(() => {
        if (mesa.status === 'occupied') {
            setIcon(mesagreen); // Cambiar al icono verde cuando está ocupada
        } else {
            setIcon(iconoMesas); // Cambiar al icono marrón cuando está disponible
        }
    }, [mesa.status]);
    return (
        <div
            style={{
                color: 'white',
                position: 'absolute',
                left: `${mesa.position_x}px`,
                top: `${mesa.position_y}px`,
                visibility: 'visible'
            }}
            className="mesa-container"
            onClick={handleClick}
        >
            <img
                src={mesa.icon ? mesa.icon : iconoMesas}
                alt="Mesa"
                className={` ${isSelected ? 'img-resplandor' : ''} ${mesa.status == "occupied" ? 'filtros-mesa' : ''}`}
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

