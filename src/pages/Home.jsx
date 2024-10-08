import React from "react";
import { MdAddBusiness } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaWarehouse } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdOutlineReport } from "react-icons/md";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <button onClick={() => navigate("/addproduct")}>
        <IoAddCircleOutline />
        Mahsulot qo'shish
      </button>
      <button onClick={() => navigate("/addmarket")}>
        <MdAddBusiness />
        Do'kon qo'shish
      </button>
      <button onClick={() => navigate("/product")}>
        <FaWarehouse />
        Mahsulotlar
      </button>
      <button onClick={() => navigate("/market")}>
        <FaShop />
        Do'konlar
      </button>
      <button>
        <a href="https://t.me/jasurbek2818">
          <MdOutlineReport /> Dasturchi
        </a>
      </button>
    </div>
  );
};

export default Home;
