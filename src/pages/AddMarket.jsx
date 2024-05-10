import axios from "axios";
import React, { useRef, useState } from "react";
import BackButton from "../components/BackButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
const AddMarket = () => {
  const marketName = useRef();
  const phone = useRef();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleOpen();
    const currentDate = new Date();
    const currentDateStr = currentDate.toISOString().substring(0, 10);
    const obj = {
      name: marketName.current.value,
      phone: phone.current.value,
      yaratilgansana: currentDateStr,
      sotilganmahsulotlar: [],
    };
    axios
      .post("https://663b3c9ffee6744a6ea0ddeb.mockapi.io/markets", obj)
      .then((response) => {
        handleClose();
        marketName.current.value = "";
        phone.current.value = "";
        alert("Do'kon qo'shildi");
      })
      .catch((error) => {
        handleClose();
        alert("Do'kon qo'shilmadi");

      });
  };

  return (
    <div className="form-wrapper">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={handleSubmit}>
        <BackButton />
        <input
          type="text"
          ref={marketName}
          placeholder="Magazin nomi"
          required
        />
        <input type="text" ref={phone} placeholder="Telefon raqam" required />
        <button>Qo'shish</button>
      </form>
    </div>
  );
};

export default AddMarket;
