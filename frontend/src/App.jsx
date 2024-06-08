import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Cart from "./Pages/Cart/Cart";
import Home from "./Pages/Home/Home";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/LoginpopUp/Login";
import Verify from "./Pages/Verify/Verify";
import Myorders from "./Pages/Myorders/Myorders";

const App = () => {

  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/PlaceOrder" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify/>}/>
          <Route path="/myorders" element={<Myorders/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
