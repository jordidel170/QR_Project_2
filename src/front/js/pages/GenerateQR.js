import React, { useState } from 'react';
import axios from 'axios';
import "../../styles/GenerateQR.css";

export const GenerateQR = () => {
    const [restaurantId, setRestaurantId] = useState('');
    const [tableId, setTableId] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/app/restaurants/${restaurantId}/tables/${tableId}/generate_qr`, {
                method: 'GET',
               
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setQrCodeUrl(url);
        } catch (error) {
            console.error('Error generating QR code', error);
        }
    };

    return (
        
        <section className='section-qr'>
            <h1 className='section-mesas-tittle'>QR codes</h1>
            <div className='container-qr'>
            <h1>Generate QR Code</h1>
            <form onSubmit={handleSubmit}>
                <div className='inputs-qr'>
                    <label className='label-qr'>
                        Restaurant ID:
                        <input 
                            type="text" 
                            value={restaurantId} 
                            onChange={(e) => setRestaurantId(e.target.value)} 
                            required 
                        />
                    </label>
                </div>
                <div className='inputs-qr'>
                    <label className='label-qr'>
                        Table ID:
                        <input 
                            type="text" 
                            value={tableId} 
                            onChange={(e) => setTableId(e.target.value)} 
                            required 
                        />
                    </label>
                </div>
                <button className='btn-qr' type="submit">Generate QR Code</button>
            </form>
            {qrCodeUrl && (
                <div className='qr-space'>
                    <h2>QR Code:</h2>
                    <img src={qrCodeUrl} alt="QR Code" />
                </div>
            )}
        </div>
        </section>
    );
};
