import React, { useContext, useState } from 'react';
import "../../styles/AddForm.css";
import { Context } from '../store/appContext';


export const AddForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    // const [enteredAmount, setEnteredAmount] = useState('0');
    const { store, actions } = useContext(Context);

    const submitHandler = (event) => {
        event.preventDefault();
        // const enteredAmountNumber = +enteredAmount;
        const enteredAmountNumber = 1;
        if (enteredAmountNumber < 1 || enteredAmountNumber > 10) {
            setAmountIsValid(false);
            return;
        }

        const meal = {
            id: props.id,
            name: props.name,
            price: props.price,
            quantity: enteredAmountNumber
        };

        actions.addToCart(meal, enteredAmountNumber);
        // setEnteredAmount('0');
    };

    const inputChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
        if (!amountIsValid) {
            setAmountIsValid(true);
        }
    };


    // const Input = (props) => {
    //     const { label, input } = props;

    //     return (
    //         <div className='input'>
    //             <label htmlFor={input.id}>{label}</label>
    //             <input {...input} />
    //         </div>
    //     );
    // };

    return (

        <form className='form' onSubmit={submitHandler}>
            <button type="submit" className='add-button'>
                
                <i class="fa-solid fa-plus"></i></button>
        </form>

    );
}
