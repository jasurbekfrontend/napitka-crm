import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import AddMarket from "./pages/AddMarket";
import Dokonlar from "./pages/Dokonlar";
import Home from "./pages/Home";
import Ombor from "./pages/Ombor";
import Login from "./pages/Login";

function App() {
  const userData = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      {userData ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addmarket" element={<AddMarket />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/market" element={<Dokonlar />} />
          <Route path="/product" element={<Ombor />} />
        </Routes>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
