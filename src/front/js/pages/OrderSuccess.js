import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const OrderSuccess = ({restaurantId,tableId}) => {
    return (
        <>
            {/* <Navbar /> */}
            <div className="order-success">
                {/* <h2>Thanks for your order</h2> */}
                <div className="success-message">
                    Your order has been placed successfully!
                </div>
                <br />
                <Link to="/restaurants/1/tables/1/menu">
                    <button className="button1">Back to Menu</button>
                </Link>
            </div>
            {/* <Footer /> */}
        </>
    );
};