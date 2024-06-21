import React, { useState, useEffect } from 'react';
import "../../styles/mesas.css";
import iconoMesas from "../../img/icono-mesa.png";



const Mesas = () => {
    const [mesas, setMesas] = useState([]);

    const agregarMesa = () => {
        const maxId = mesas.reduce((max, mesa) => Math.max(max, mesa.id), 0);
        const nuevaMesa = {
            id: maxId + 1,
            nombre: `Mesa ${maxId + 1}`,
            posicion: { x: 0, y: 10 },
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

    function finalizarArrastre(e) {
        e.target.style.zIndex = ''; // Restablecer el z-index
    }

    const permitirSoltar = (e) => {
        e.preventDefault();

    };

    const [modoEdicion, setModoEdicion] = useState(false);


    const [largoSala, setLargoSala] = useState(10); // Largo de la sala en metros
    const [anchoSala, setAnchoSala] = useState(18); // Ancho de la sala en metros

    const [tempLargoSala, setTempLargoSala] = useState('');
    const [tempAnchoSala, setTempAnchoSala] = useState('');

    // Función para actualizar el tamaño de la sala basado en los inputs
    const actualizarTamañoSala = () => {
        const proporcion = 60; // 1 metro = 100 píxeles, ajusta según tu diseño
        const nuevoAncho = anchoSala * proporcion; // Nuevo ancho en píxeles
        const nuevoAlto = largoSala * proporcion; // Nuevo alto en píxeles

        // Actualiza el estilo del div de la sala
        const divSala = document.querySelector('.sala');
        divSala.style.width = `${nuevoAncho}px`;
        divSala.style.height = `${nuevoAlto}px`;
    };
    // const activarModoEdicion = () => {
    //     setModoEdicion(!modoEdicion);
    // };
    // const [modoEliminacion, setModoEliminacion] = useState(false);

    // const activarModoEliminacion = () => {
    //     setModoEliminacion(!modoEliminacion);
    // };
    const eliminarMesa = (id) => {
        setMesas(mesas.filter(mesa => mesa.id !== id));
    };

    const manejarSoltar = (e) => {
        e.preventDefault();
        const contenedor = e.target.getBoundingClientRect();
        const id = e.dataTransfer.getData("text/plain");
        // Ajuste para centrar el icono en la posición del cursor
        const ajusteX = 51; // La mitad del ancho del icono
        const ajusteY = 39; // La mitad del alto del icono
        const nuevaPosicion = {
            x: e.clientX - contenedor.left - ajusteX,
            y: e.clientY - contenedor.top - ajusteY
        };
        const draggingElements = document.querySelectorAll('.dragging');
        draggingElements.forEach(elem => elem.classList.remove('dragging'));
        moverMesa(parseInt(id), nuevaPosicion);
    };

    const actualizarNombreMesa = (id, nuevoNombre) => {
        setMesas(mesasPrevias => mesasPrevias.map(mesa =>
            mesa.id === id ? { ...mesa, nombre: nuevoNombre } : mesa
        ));
    };


    return (
        <>
            <section>
                <div className='container-mesas'>
                    <h3>Agregar Mesa</h3>
                    <img src={iconoMesas} alt="Agregar Mesa" onClick={agregarMesa} style={{ cursor: 'pointer', width: '50px', height: '50px' }} />
                    <button className='editar' onClick={() => setModoEdicion(!modoEdicion)}>Editar elementos</button>
                </div>
                <div
                    className="sala container-mesas"
                    style={{ width: '1080px', height: '600px', position: 'relative', border: '1px solid black' }}
                    onDragOver={permitirSoltar}
                    onDrop={manejarSoltar}
                >
                    {mesas.map((mesa) => (
                        <div
                            key={mesa.id}
                            draggable={!modoEdicion}
                            onDragStart={(e) => iniciarArrastre(e, mesa.id)}
                            onDragEnd={finalizarArrastre} // Usar el nuevo manejador aquí
                            style={{ cursor: 'grab', color: 'white', position: 'absolute', left: mesa.posicion.x, top: mesa.posicion.y, zIndex: parseInt(mesa.nombre.replace(/\D/g, '')) || 1 }}
                            className="mesa-container"
                        >
                            <img src={iconoMesas} alt="Mesa" style={{ width: '50px', height: '50px' }} />
                            {modoEdicion ? (
                                <>
                                    <input className='input-nombre-mesa'
                                        type="text"
                                        defaultValue={mesa.nombre}
                                        onBlur={(e) => actualizarNombreMesa(mesa.id, e.target.value)}
                                    />
                                    <button className='eliminar-mesa' onClick={() => eliminarMesa(mesa.id)} style={{ position: 'absolute', transform: 'translateX(-50%)', backgroundColor: 'red', color: 'white' }}>X</button>
                                </>
                            ) : (
                                <div>{mesa.nombre}</div>
                            )}
                        </div>
                    ))}

                </div>
                <div className='container-mesas'>
                    <h3>Editar<br />Salón</h3>
                    <div className='sala-container'>
                        <p className='titulos'>Nombre<br /> del salón</p>

                        <input className='nombre-sala' type="text" defaultValue="Sala 1" placeholder="Nombre" />
                    </div>
                    <h3>Tamaño</h3>
                    <div className='sala-container'>
                        <p className='titulos'>Largo</p>
                        <input
                            type="number"
                            className='nombre-sala'
                            value={tempLargoSala} // Cambiado a tempLargoSala

                            onChange={(e) => {
                                setTempLargoSala(e.target.value); // Actualiza tempLargoSala
                            }}

                            placeholder="Largo"
                        />
                        <p className='titulos'>Ancho</p>
                        <input
                            type="number"
                            className='nombre-sala'
                            value={tempAnchoSala} // Cambiado a tempAnchoSala

                            onChange={(e) => {
                                setTempAnchoSala(e.target.value); // Actualiza tempAnchoSala
                            }}
                            placeholder="Ancho"
                        />
                        <button className='aceptar' onClick={() => {
                            setLargoSala(tempLargoSala); // Actualiza largoSala
                            setAnchoSala(tempAnchoSala); // Actualiza anchoSala
                            actualizarTamañoSala(); // Llama a actualizarTamañoSala
                            
                        }}>Aceptar</button> {/* Botón Aceptar agregado */}

                        <button className='editar' onClick={() => setModoEdicion(!modoEdicion)}>Editar elementos</button>
                    </div>

                    
                </div>
            </section>
        </>
    );
};

export default Mesas;

// {modoEliminacion && <button className='eliminar-mesa' onClick={() => eliminarMesa(mesa.id)} style={{position: 'absolute', transform: 'translateX(-50%)', backgroundColor: 'red', color: 'white'}}>X</button>}
