import React from "react";
import { useNavigate } from "react-router-dom";
import "./PricingCard.css";

const PriceCard = ({ title, price, storage, users, sendUp }) => {
  const navigate = useNavigate();

  const handleNextButtonClick = () => {
    // Naviguer vers "/login"
    navigate("/login");
  };

  return (
    <div className="PricingCard">
      <header>
        <p className="card-title">{title}</p>
        <h1 className="card-price">{price}</h1>
      </header>
      {/* features here */}
      <div className="card-features">
        <div className="card-storage">{storage}</div>
        <div className="card-users-allowed">{users} users in total</div>
        <div className="card-send-up">Send up to {sendUp}</div>
      </div>
      <button className="card-btn" onClick={handleNextButtonClick}>
        Next
      </button>
    </div>
  );
};

export default PriceCard;
