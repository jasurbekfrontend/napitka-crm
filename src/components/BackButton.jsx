import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button id="backbutton" type="button" onClick={() => navigate("/")}>
      <FaArrowLeft />
    </button>
  );
};

export default BackButton;
