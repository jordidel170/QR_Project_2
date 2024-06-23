import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/caja.css";
import mesasImage from '../../img/mesas.png';
import menu from "../../img/menu.png";
import factura from "../../img/factura.png";
import ajustes from "../../img/ajustes.png";
import pantone from "../../img/pantone.png";
import cajero from "../../img/cajero.png";

const Caja = () => {
    const [largoSala, setLargoSala] = useState('600px');
    const [anchoSala, setAnchoSala] = useState('600px');

    // Supongamos que este código se encuentra en otro archivo JavaScript donde necesitas recuperar los estados guardados
    const recuperarEstado = () => {
        // Intenta recuperar los datos; si no existen, usa valores predeterminados
        const mesas = JSON.parse(localStorage.getItem('mesas')) || [];
        const angulosRotacion = JSON.parse(localStorage.getItem('angulosRotacion')) || [];
        const largo = JSON.parse(localStorage.getItem('largoSala')) || 'Valor predeterminado para largo';
        const ancho = JSON.parse(localStorage.getItem('anchoSala')) || 'Valor predeterminado para ancho';
    
        // Ahora puedes usar 'mesas', 'angulosRotacion', 'largoSala', y 'anchoSala' en tu aplicación
        console.log(mesas, angulosRotacion, largo, ancho);
        
        setLargoSala(largo);
        setAnchoSala(ancho);
    };
  
    useEffect(() => {
        recuperarEstado();
    }, []);
  
    useEffect(() => {
        const aplicarMedidas = () => {
            const contenedorMesas = document.querySelector('.container-caja-mesas');
            if (contenedorMesas) {
                contenedorMesas.style.width = largoSala;
                contenedorMesas.style.height = anchoSala;
            }
        };
        aplicarMedidas();
    }, [largoSala, anchoSala]);
  
    return (
        <>
            <section>
                <div className="container-caja-mesas">
                    {/* Aquí puedes añadir otros elementos o contenido que necesites */}
                </div>
            </section>
        </>
    );
};

export default Caja;



