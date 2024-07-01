import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/caja.css";
import mesasImage from '../../img/mesas.png';
import menu from "../../img/menu.png";
import factura from "../../img/factura.png";
import ajustes from "../../img/ajustes.png";
import pantone from "../../img/pantone.png";
import cajero from "../../img/cajero.png";
import iconoMesas from "../../img/icono-mesa.png";
import iconoAtras from "../../img/flecha-hacia-atras.png";
import iconoLlave from "../../img/llave.png";
import iconoPagar from "../../img/pagar.png";
import iconoAnadir from "../../img/anadir.png";
import iconoEliminar from "../../img/eliminar.png";
import iconoCard from "../../img/card1.png";
import iconoMoney from "../../img/money1.png";
import iconoDash from "../../img/dash.png";
import suelo from "../../img/suelo506.png";
import { Context } from "../store/appContext";
import Mesa from "../component/Mesa";

const Caja = () => {
    const [largoSala, setLargoSala] = useState('600px');
    const [anchoSala, setAnchoSala] = useState('600px');
    const [mesas, setMesas] = useState([]);
    const [angulosRotacion, setAngulosRotacion] = useState({});
    const [mostrarCarta, setMostrarCarta] = useState(false);
    const [mostrarCalculadora, setMostrarCalculadora] = useState(false);
    const { store, actions } = useContext(Context);
    const [activeSession, setActiveSession] = useState({ id_table: 1, products: [] });
    const [loading, setLoading] = useState(true);
    const [selectedTable, setSelectedTable] = useState(null);
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
    const [productPrices, setProductPrices] = useState([]);
    const [paidAmount, setPaidAmount] = useState(0); // Estado para manejar la cantidad pagada
    const totalToPay = activeSession.products.reduce((acc, product) => acc + (product.price * product.quantity), 0); // Calcula el total a pagar
    const navigate = useNavigate();
    const payInputRef = useRef(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalInsufficientPaymentVisible, setModalInsufficientPaymentVisible] = useState(false);

    const recuperarEstado = () => {
        const largo = JSON.parse(localStorage.getItem('largoSala')) || '600px';
        const ancho = JSON.parse(localStorage.getItem('anchoSala')) || '600px';
        const mesasGuardadas = JSON.parse(localStorage.getItem('mesas')) || [];
        const angulosGuardados = JSON.parse(localStorage.getItem('angulosRotacion')) || {};

        setLargoSala(largo);
        setAnchoSala(ancho);
        setMesas(mesasGuardadas);
        setAngulosRotacion(angulosGuardados);
    };

    const irADashboard = () => {
        navigate('../app/dashboard');
    };

    const abrirModal = () => {
        setModalVisible(true);
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setModalVisible(false); // Iniciar la animación de desvanecimiento
        setTimeout(() => {
            setMostrarModal(false); // Después de que la animación se complete, ocultar el modal completamente
        }, 500); // Debe coincidir con la duración de la animación CSS
    };

    const manejarClickAtrasConModal = () => {
        manejarClickAtras();
        abrirModal();
    };

    const manejarClickAnadir = () => {
        setMostrarCarta(true);
        setMostrarCalculadora(false);
        resetPaidAmount(); 
    };

    const manejarClickAtras = () => {
        setMostrarCarta(false);
        setMostrarCalculadora(false);
        resetPaidAmount();
    };

    const manejarClickPagar = () => {
        setMostrarCalculadora(true);
        setMostrarCarta(false);
        resetPaidAmount();
    };

    const abrirCaja = () => {
        alert("Cash Box Opened!");
    };

    const fetchProductPrices = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/app/products');
            const data = await response.json();
            setProductPrices(data);
        } catch (error) {
            console.error("Error fetching product prices:", error);
        }
    };

    const handlePaidAmountChange = (event) => {
        const value = parseFloat(event.target.value); // Convierte el valor del input a número
        if (!isNaN(value)) { // Verifica si el valor es un número
            setPaidAmount(value); // Actualiza el estado con el nuevo valor
        } else {
            setPaidAmount(0); // Resetea el estado si el valor no es un número
        }
        
    };

    const resetPaidAmount = () => {
        setPaidAmount(0); // Resetea el monto pagado
        if (payInputRef.current) {
            payInputRef.current.value = ""; // Borra el contenido del input
        }
    };

    const change = paidAmount - totalToPay;

    

    const handleActiveSession = async (table_number) => {
        const data = await actions.getActiveSessionTable(table_number);
        if (!data.products || !Array.isArray(data.products)) {
            setActiveSession({ table_number: table_number, products: [] });
            return;
        }
        
        // Combina los productos en la sesión con sus precios correspondientes
        const productsWithPrices = data.products.map(product => {
            const productDetails = productPrices.find(p => p.id === product.id_product);
            return {
                ...product,
                price: productDetails ? productDetails.price : null
            };
        });

        const groupedProducts = productsWithPrices.reduce((acc, product) => {
            if (!acc[product.id_product]) {
                acc[product.id_product] = { ...product };
            } else {
                acc[product.id_product].quantity += product.quantity;
            }
            return acc;
        }, {});

        setActiveSession({ table_number: table_number, products: Object.values(groupedProducts) });
    };

    const handleActiveSessionList = async () => {
        const dataSessionList = await actions.getActiveSessionList();
        setMesas(prevMesas =>
            prevMesas.map((mesa) => {
                const isActive = dataSessionList.some(session => session.status == 'active' && session.table_number == mesa.table_number);
                return { ...mesa, isActive };
            })
        );
    };

    const handleMesaClick = (id) => {
        setMesaSeleccionada(id);
    };

    const handleDeselect = () => {
        setSelectedTable(null);
        setMesaSeleccionada(null);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.mesa-container')) {
            handleDeselect(); 
        }
    };

    const handleKeyPress = (key) => {
        if (key === '⌫') {
            payInputRef.current.value = payInputRef.current.value.slice(0, -1);
        } else {
            payInputRef.current.value += key;
        }
        
        handlePaidAmountChange({ target: { value: payInputRef.current.value } });
    };

const formattedChange = (change) => {
    if (change < 0 && change > -0.005) {
        return "0.00";
    }
    return change.toFixed(2);
};

const manejarClickCash = () => {
    if (paidAmount < totalToPay) {
        setModalInsufficientPaymentVisible(true); // Mostrar el modal de pago insuficiente
    } else {
        setModalInsufficientPaymentVisible(false); // Ocultar el modal de pago insuficiente si el pago es suficiente
        abrirModal();  // Abre el modal principal si el pago es suficiente
    }

    if (change >= 0) {
        setMostrarCalculadora(false); // Ocultar la calculadora si el cambio es >= 0
        setMostrarCarta(false); // Asegurarse de que también se oculta la carta si estaba visible
        handleDeselect(); // Deseleccionar mesa si está seleccionada
    } else {
        setMostrarCalculadora(true); // Mostrar la calculadora si el cambio es < 0
    }
};

useEffect(() => {
    const fetchData = async () => {
        recuperarEstado();
        await fetchProductPrices();
        await handleActiveSessionList();
        setLoading(false);
    };

    fetchData();
}, []);

useEffect(() => {
    const aplicarMedidas = () => {
        const contenedorMesas = document.querySelector('.container-caja-mesas');
        if (contenedorMesas) {
            contenedorMesas.style.height = `${largoSala * 55}px`;
            contenedorMesas.style.width = `${anchoSala * 55}px`;
        }
    };
    aplicarMedidas();
}, [largoSala, anchoSala]);

useEffect(() => {
    let temporizador;
    if (mostrarModal) {
        temporizador = setTimeout(() => {
            cerrarModal();
        }, 1200); // TIEMPO MODAL 850
    }
    return () => clearTimeout(temporizador); 
}, [mostrarModal]);

    useEffect(() => {
        const interval = setInterval(() => {
            handleActiveSessionList();
        }, 3000);
        // OJO, ACTUALIZAR TIEMPO DE SESIONES

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (mostrarCalculadora && payInputRef.current) {
            payInputRef.current.focus();
        }
    }, [mostrarCalculadora]);

    useEffect(() => {
        // Oculta el modal de pago insuficiente si el cambio es >= 0
        if (change >= 0) {
            setModalInsufficientPaymentVisible(false);
        }
    }, [change]);

    useEffect(() => {
        const handleCloseModal = (event) => {
            // Verifica si el clic fue fuera del modal o si se pulsó cualquier tecla
            if (
                modalInsufficientPaymentVisible &&
                (event.type === 'click' || event.type === 'keydown')
            ) {
                setModalInsufficientPaymentVisible(false); // Cierra el modal
            }
        };

        // Agrega los listeners para clics y teclas
        document.addEventListener('click', handleCloseModal);
        document.addEventListener('keydown', handleCloseModal);

        // Limpia los listeners al desmontar el componente
        return () => {
            document.removeEventListener('click', handleCloseModal);
            document.removeEventListener('keydown', handleCloseModal);
        };
    }, [modalInsufficientPaymentVisible]);

    return (
        <>
            <section>
                <h1 className='section-mesas-tittle'>Cash</h1>
                <div className="container-ticket">
                    <div className="botones-arriba">
                        {/* <button onClick={irADashboard} className="boton-dash"><img src={iconoDash} alt="Atrás" style={{ width: '30px', height: '30px' }} /> Dashboard</button> */}
                        <button className="boton-atras" onClick={manejarClickAtras}><img src={iconoAtras} alt="Atrás" style={{ width: '20px', height: '20px' }} /> Back</button>
                    </div>
                    <div className="ticket">
                        <div className="ticket_table">
                                <div className="ticket-view">
                                    <h5> Table number: <strong> {activeSession.table_number}</strong></h5>
                                    {activeSession.products && activeSession.products.length > 0 ? (
                                        activeSession.products.map((product, index) => (
                                            <div className="div-product" key={index}>
                                                <div className="product--name">{product.product_name}</div>
                                                <div className="product-qty">{product.quantity}</div>
                                                <div className="product-total"><div className="divisa"> $</div>{(product.price * product.quantity).toFixed(2)}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="empty-table-message">▶ Empty table ◀</div>
                                    )}
                                </div>      
                            <h2></h2>
                            <div className="total--price">
                                <div className="total--price-tittle">Total:</div>
                                <div className="total--price-amount">${totalToPay.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="botones">
                        <button onClick={abrirCaja} className="boton-abrir-caja">Open Cash<img src={iconoLlave} alt="Atrás" style={{ width: '35px', height: '35px' }} /></button>
                        <button className="boton-pagar" onClick={manejarClickPagar}>Pay <br /><img src={iconoPagar} alt="Atrás" style={{ width: '35px', height: '35px' }} /></button>
                        <button className="boton-anadir" onClick={manejarClickAnadir}>Add <img src={iconoAnadir} alt="Atrás" style={{ width: '25px', height: '25px' }} /></button>
                        <button className="boton-eliminar">Delete <img src={iconoEliminar} alt="Atrás" style={{ width: '25px', height: '25px' }} /></button>
                    </div>
                </div>

                {!mostrarCarta && !mostrarCalculadora ? (
                    <div className="container-caja-mesas" style={{ backgroundImage: `url(${suelo})`, backgroundSize: '110px', backgroundPosition: 'center' }}>
                        <div className="loader" style={{ visibility: loading ? 'visible' : 'hidden' }}><span>Loading tables status</span>
                            <div className="progress"></div>
                        </div>
                        {mesas.map((mesa) => (
                            <Mesa
                                key={mesa.id}
                                mesa={mesa}
                                isSelected={selectedTable === mesa.table_number || mesaSeleccionada === mesa.id}
                                onDeselect={handleDeselect}
                                onClick={() => {
                                    handleActiveSession(mesa.table_number);
                                    handleMesaClick(mesa.id);                                  
                                }}
                                angulo={angulosRotacion[mesa.id]}
                            />
                        ))}
                    </div>
                ) : mostrarCarta ? (
                    <div className="carta-caja">
                        <h1>Carta</h1>
                    </div>
                ) : (
                    <div className="container-calculadora">
                        <div className="calculadora">
                            <div className="calculadora-total">
                                <div className="to-pay">
                                    <h2>To Pay:</h2>
                                    <h3>{activeSession.products.reduce((acc, product) => acc + (product.price * product.quantity), 0).toFixed(2)}</h3>
                                </div>
                                <div className={`to-change ${change < -0.001 ? 'negative' : ''}`}>
                                    <h2>Change:</h2>
                                    <h3>{formattedChange(change)}</h3>
                                </div>
                                <div className="to-paid">
                                    <h2>Paid:</h2>
                                    <div className="dollar-group">
                                        <input className="pay-input" type="text" onChange={handlePaidAmountChange} ref={payInputRef} />
                                    </div>
                                </div>
                                <div className="teclado">
                                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map((key) => (
                                        <button key={key} className="teclado-btn" onClick={() => handleKeyPress(key)}>
                                            {key}
                                        </button>
                                    ))}
                                </div>
                                <div className="botones-pagar">
                                <button className="boton-cash" onClick={manejarClickCash}>
                                        Cash <br />
                                        <img src={iconoMoney} alt="Atrás" style={{ width: '50px', height: '50px' }} />
                                    </button>
                                    <button className="boton-card" onClick={manejarClickAtrasConModal}>Credit Card <br /><img src={iconoCard} alt="Atrás" style={{ width: '50px', height: '50px' }} /></button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                )}
                {mostrarModal && (
                <div className={`modal-cash ${mostrarModal ? 'fade-in' : 'fade-out'}`}>
                    <h3>Ticket invoiced.</h3>
                    {/* Aquí puedes colocar contenido adicional del modal principal */}
                    
                </div>
            )}

            {/* Modal de pago insuficiente */}
            {modalInsufficientPaymentVisible && (
                <div className="modal-insufficient-payment">
                    <h3>Insufficient Payment</h3>
                    <p>Please pay the full amount before proceeding.</p>
                    
                </div>
                )}
                
            </section>
            
        </>
    );
};

export default Caja;





