import react from "react"
import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';


    
   // QRScanner.jsx


const QRScanner = ({ onScanSuccess }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      scannerRef.current.id, 
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    const handleScanSuccess = (decodedText, decodedResult) => {
      onScanSuccess(decodedText);
    };

    const handleScanFailure = (error) => {
      console.log(decodedResult)
      console.warn(`QR error = ${error}`);
    };

    scanner.render(handleScanSuccess, handleScanFailure);

    // Cleanup function
    return () => {
      scanner.clear();
    };
  }, [onScanSuccess]);

  return (
    <div>
      <div id="qr-reader" ref={scannerRef} style={{ width: '500px', height: '500px' }}></div>
    </div>
  );
};




export default QRScanner