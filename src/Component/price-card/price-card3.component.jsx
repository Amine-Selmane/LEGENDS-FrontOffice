import React from "react";
import axios from "axios";

import "./PricingCard.css";
const PriceCard3 = ({ title, price, storage, users, sendUp ,userEmail,userId}) => {

   

  const handleCheckout = () => {
      axios.post(`http://localhost:5000/inscri/create-checkout-session`, {
          cartItems: [
              {
                montant: price,
                annual: title,
              },
            ],
            userEmail,
            userId,
          })
        .then((response) => {
          if (response.data.url) {
            window.location.href = response.data.url;
          }
        })
        .catch((err) => console.log(err.message));
    };
  return (
      <div className="PricingCard">
          <header>
              <p className="card-title">{title}</p>
              <h1 className="card-price">{price} $</h1>
          </header>
          {/* Features here */}
          <div className="card-features">
              <div className="card-storage">{storage}</div>
              <div className="card-users-allowed">{users} users in total</div>
              <div className="card-send-up">Send up to {sendUp}</div>
          </div>
          <button className="card-btn" onClick={handleCheckout}>Next</button>
      </div>
  );
};


export default PriceCard3;