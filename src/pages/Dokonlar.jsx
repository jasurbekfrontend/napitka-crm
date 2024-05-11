import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import BackButton from "../components/BackButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const Dokonlar = () => {
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  function getData() {
    handleOpen();

    axios
      .get("https://663b3c9ffee6744a6ea0ddeb.mockapi.io/markets")
      .then((response) => {
        setShops(response.data);
        handleClose();
      })
      .catch((error) => {
        handleClose();
        console.log(error);
        alert(error.message);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const filteredData = shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  function deleteItem(id) {
    axios
      .delete(`https://663b3c9ffee6744a6ea0ddeb.mockapi.io/markets/${id}`)
      .then((response) => {
        alert("Do'kon o'chirildi");
        getData();
      })
      .catch((error) => {
        console.log("Do'kon o'chirilmadi");
      });
  }
  return (
    <div className="productContainer">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <BackButton />
      <b>Do'konlar</b>
      {shops.length > 1 ? (
        <div className="search">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => setSearchQuery("")}>
            <IoClose />
          </button>
        </div>
      ) : null}
      {filteredData.length > 0 ? (
        filteredData.map((shop) => (
          <div className="market" key={shop.id}>
            <b>
              {formatDate(shop.yaratilgansana)} <p>{shop.phone}</p>
            </b>
            <h3>
              {shop.name}{" "}
              <div className="actions">
                <button onClick={() => deleteItem(shop.id)}>
                  <MdDelete />
                </button>
                <button onClick={() => navigate("/product")}>
                  <IoAddCircleOutline />
                </button>
              </div>
            </h3>
            <div className="selledProducts">
              {shop.sotilganmahsulotlar.length < 1 ? (
                <div className="productCard">
                  <b>Hali mahsulot sotilmagan</b>
                </div>
              ) : (
                shop.sotilganmahsulotlar.map((product) => (
                  <div className="productCard" key={product.id}>
                    <p>{formatDate(product.date)}</p>
                    <div className="title">
                      <b>{product.name}</b>
                      <p>{product.volume}l</p>
                      <b>
                        {product.amount} {product.type}
                      </b>
                    </div>
                    <div className="subtitle">
                      <p>
                        {product.price.toLocaleString()} so'mdan /{" "}
                        {(product.amount * product.price).toLocaleString()} so'm
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="productCard">
          <b>Hali do'kon qo'shilmagan</b>
        </div>
      )}
    </div>
  );
};

export default Dokonlar;
