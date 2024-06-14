// App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useNavigate,
  Routes,
} from "react-router-dom";
import QRScanner from "./Qrscanner";
import Menu from "./Menu";
import { Navigate } from "react-router-dom";

const App = () => {
  const Navigate = useNavigate();
  const [menuData, setMenuData] = useState(null);

  const handleScanSuccess = (decodedText) => {
    setMenuData(decodedText);
    Navigate("/app/signup");
  };

  return (
    <div>
      <Routes>
        <Route path="/menu" element={<Menu menuData={menuData} />} />
        <Route
          path="/"
          element={
            <div>
              <h1>QR Code Reader</h1>
              <QRScanner onScanSuccess={handleScanSuccess} />
              <div id="result">Scan a QR code to see the menu</div>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
