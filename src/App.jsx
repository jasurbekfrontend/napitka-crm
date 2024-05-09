import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import AddMarket from "./pages/AddMarket";
import Dokonlar from "./pages/Dokonlar";
import Home from "./pages/Home";
import Ombor from "./pages/Ombor";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addmarket" element={<AddMarket />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/market" element={<Dokonlar />} />
        <Route path="/product" element={<Ombor />} />
      </Routes>
    </>
  );
}

export default App;
