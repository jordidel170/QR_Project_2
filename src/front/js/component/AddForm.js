import React, { useContext, useState, useEffect } from 'react';
import "../../styles/AddForm.css";
import { Context } from '../store/appContext';


export const AddForm = (props) => {
//     const [amountIsValid, setAmountIsValid] = useState(true);
//     const [enteredAmount, setEnteredAmount] = useState('1');
//     const { store, actions } = useContext(Context);

//     const submitHandler = (event) => {
//         event.preventDefault();
//         // const enteredAmountNumber = +enteredAmount;
//         const enteredAmountNumber = 1;
//         if (enteredAmountNumber < 1 || enteredAmountNumber > 10) {
//             setAmountIsValid(false);
//             return;
//         }

//         const meal = {
//             id: props.id,
//             name: props.name,
//             price: props.price,
//             quantity: enteredAmountNumber
//         };

//         actions.addToCart(meal, enteredAmountNumber);
//         // setEnteredAmount('0');
//     };

//     const inputChangeHandler = (event) => {
//         setEnteredAmount(event.target.value);
//         if (!amountIsValid) {
//             setAmountIsValid(true);
//         }
//     };


//     // const Input = (props) => {
//     //     const { label, input } = props;

//     //     return (
//     //         <div className='input'>
//     //             <label htmlFor={input.id}>{label}</label>
//     //             <input {...input} />
//     //         </div>
//     //     );
//     // };

//     return (

//         <form className='form' onSubmit={submitHandler}>
//             <button type="button" className='remove-button' onClick={() => actions.removeFromCart(props.id)}>
//                 <i className="fa-solid fa-minus"></i>
//             </button>
//             <button type="submit" className='add-button'>
                
//                 <i class="fa-solid fa-plus"></i></button>
//         </form>

//     );
// }
    const { store, actions } = useContext(Context);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const cartItem = store.cart.find(item => item.id === props.id);
        if (cartItem) {
            setQuantity(cartItem.quantity);
        }
    }, [store.cart, props.id]);

    const addHandler = () => {
        const meal = {
            id: props.id,
            name: props.name,
            price: props.price,
            quantity: 1
        };
        actions.addToCart(meal, 1);
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const removeHandler = () => {
        if (quantity > 1) {
            actions.removeFromCart(props.id);
            setQuantity(prevQuantity => prevQuantity - 1);
        } else {
            actions.removeItem(props.id); 
        }
    };

    return (
        <div className='form'>
            <button type="button" className='remove-button' onClick={removeHandler}>
                <i className="fa-solid fa-minus"></i>
            </button>
            <span className='quantity'>{quantity}</span>
            <button type="button" className='add-button' onClick={addHandler}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    );
};
