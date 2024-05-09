import axios from "axios";
import React, { useRef, useState } from "react";
import BackButton from "../components/BackButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
const AddProduct = () => {
  const nameRef = useRef();
  const typeRef = useRef();
  const volumeRef = useRef();
  const priceRef = useRef();
  const amountRef = useRef();

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
      name: nameRef.current.value,
      type: typeRef.current.value,
      volume: parseFloat(volumeRef.current.value),
      price: parseFloat(priceRef.current.value),
      amount: parseFloat(amountRef.current.value),
      date: currentDateStr,
      openMenu: false,
    };
    axios
      .post("https://663b3c9ffee6744a6ea0ddeb.mockapi.io/products", obj)
      .then((response) => {
        nameRef.current.value = "";
        typeRef.current.value = "";
        volumeRef.current.value = "";
        priceRef.current.value = "";
        amountRef.current.value = "";
        window.location.reload();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        handleClose();
        window.location.reload();
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
        <input ref={nameRef} required type="text" placeholder="Mahsulot nomi" />
        <input
          ref={priceRef}
          required
          type="number"
          placeholder="Mahsulot narxi"
        />
        <input
          ref={amountRef}
          required
          type="number"
          placeholder="Mahsulot soni"
        />
        <select ref={typeRef} defaultValue="" required>
          <option value="" disabled>
            Sanash turini tanlang
          </option>
          <option value="blok">Blok</option>
          <option value="dona">dona</option>
        </select>

        <select ref={volumeRef} defaultValue="" required>
          <option value="" disabled>
            litrni tanlang
          </option>
          <option value={0.5}>0.5 l</option>
          <option value={1}>1 l</option>
          <option value={1.5}>1.5 l</option>
          <option value={2}>2 l</option>
          <option value={5}>5 l</option>
          <option value={10}>10 l</option>
        </select>

        <button type="submit">Yuborish</button>
      </form>
    </div>
  );
};

export default AddProduct;
