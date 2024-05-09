import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Ombor = () => {
  const [data, setData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sellingAmount, setSellingAmount] = useState(1);
  const [selectedShop, setSelectedShop] = useState("");

  const handleClose = () => {
    setLoading(false);
  };

  async function sellItem(id, sellingAmount, selectedShopId, e) {
    e.preventDefault();
    
    try {
      const product = data.find((product) => +product.id === +id);
      const shop = shopData.find((shop) => shop.id === selectedShopId);
  
      // Update product amount
      await axios.put(
        `https://663b3c9ffee6744a6ea0ddeb.mockapi.io/products/${id}`,
        { amount: product.amount - sellingAmount }
      );
  
      // Update shop data
      const updatedShopData = shop.sotilganmahsulotlar ? [...shop.sotilganmahsulotlar] : [];
      updatedShopData.push({
        id: id,
        name: product.name,
        type: product.type,
        volume: product.volume,
        price: product.price,
        amount: sellingAmount,
        date: new Date().toISOString().split("T")[0],
      });
  
      await axios.put(
        `https://663b3c9ffee6744a6ea0ddeb.mockapi.io/markets/${selectedShopId}`,
        { ...shop, sotilganmahsulotlar: updatedShopData }
      );
  
      console.log(`Item sold successfully to shop ${shop.name}`);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  
    console.log(id);
    console.log(sellingAmount);
    console.log(selectedShopId);
  }
  

  const openMenu = async (id) => {
    const updatedData = data.map((product) =>
      product.id === id ? { ...product, openMenu: !product.openMenu } : product
    );
    setData(updatedData);

    try {
      await axios.put(
        `https://663b3c9ffee6744a6ea0ddeb.mockapi.io/products/${id}`,
        {
          openMenu: !data.find((product) => product.id === id).openMenu,
        }
      );
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  function formatDate(dateString) {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    setLoading(true);

    axios
      .get("https://663b3c9ffee6744a6ea0ddeb.mockapi.io/products")
      .then((response) => {
        setData(response.data);
        axios
          .get("https://663b3c9ffee6744a6ea0ddeb.mockapi.io/markets")
          .then((marketResponse) => {
            setShopData(marketResponse.data);
            handleClose();
          })
          .catch((marketError) => {
            console.log(marketError);
            alert(marketError.message);
            handleClose();
          });
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
        handleClose();
      });
  }, []);

  return (
    <div className="productContainer">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <BackButton />
      <b>Ombordagi mahsulotlar</b>
      {data.map((product) => (
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
          <div className="actions">
            <button>
              <MdDelete />
            </button>
            <button onClick={() => openMenu(product.id)}>
              {product.openMenu ? <IoClose /> : <MdOutlineFileUpload />}
            </button>
          </div>
          {product.openMenu && (
            <div className="selling-form">
              <form
                onSubmit={(event) =>
                  sellItem(product.id, sellingAmount, selectedShop, event)
                }
              >
                <input
                  type="number"
                  placeholder="Soni"
                  required
                  max={product.amount}
                  min={1}
                  value={sellingAmount}
                  onChange={(event) => setSellingAmount(event.target.value)}
                />
                <select
                  value={selectedShop}
                  onChange={(event) => setSelectedShop(event.target.value)}
                >
                  <option value="" disabled>
                    Do'konni tanlang
                  </option>
                  {shopData.map((shop) => (
                    <option key={shop.id} value={shop.id}>
                      {shop.name}
                    </option>
                  ))}
                </select>
                <button type="submit">
                  <MdOutlineFileUpload />
                </button>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Ombor;
