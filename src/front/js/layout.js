import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

import { Home } from "./pages/home";
import { Menu } from "./pages/menu";
import { OrderSummary } from "./pages/OrderSummary";
import { OrderSuccess } from "./pages/OrderSuccess";
import { AboutUs } from "./pages/AboutUs";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import  Login  from "./pages/login";
import injectContext from "./store/appContext";



import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Signup from "./pages/signup";
import App from "./component/app";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/app/login" />;
  }
  const decodedToken = jwtDecode(token);
  console.log(decodedToken.roles);
  if (role && decodedToken.roles !== role) {
    return <Navigate to="/app/login" />;
  }
  return children;
};
//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;


    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    {/* <Navbar /> */}
                    <Routes>

                        <Route element ={<Login/>} path="/app/login"/>
                        <Route element={<Signup />} path="/app/signup" />
                    <Route element={<ProtectedRoute role="user"> <Home /> </ProtectedRoute>} path="app/home" />
                        <Route element={<Menu />} path="/restaurants/:restaurantId/tables/:tableId/menu" />
                        <Route element={<OrderSummary />} path="/order-summary" />
                        <Route element={<OrderSuccess />} path="/order-success" />
                        <Route element={<AboutUs />} path="/about-us" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    {/* <Footer /> */}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );

};

export default injectContext(Layout);
