import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotals } from "./Action/cartSlice";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./style.css" ;

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <div className="checkout-success-container">
      <div className="checkout-success">
        <div className="checkout-success-content">
          <h2 className="checkout-success-title">Checkout Successful</h2>
          <p>Your order might take some time to process.</p>
          <p>Check your mail for order verification.</p>
          <p>In case of any inquiries, contact support.</p>
          <Link to="/" className="checkout-success-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            <span>Go back</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
