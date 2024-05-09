import React, { useEffect } from "react";
import {  clearCartBook, getTotalBook } from "./Action/cartSliceBook";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const cartBook = useSelector((state) => state.cartBook);

  useEffect(() => {
    dispatch(clearCartBook());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotalBook());
  }, [cartBook, dispatch]);

  return (
    <Container>
      <h2>Checkout Successful</h2>
      <p>Your reservation detaills will be sended to your email</p>
      <p>thank you for joining us</p>
      <p>
        Incase of any inqueries contact the support at{" "}
        <strong>ElKindy@onlineshop.com</strong>
      </p>
      <Link to="/books">
             
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  <span>Continue Shopping</span>
                </Link>
    </Container>
  );
};

export default CheckoutSuccess;

const Container = styled.div`
  min-height: 80vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 0.5rem;
    color: #029e02;
  }
`;