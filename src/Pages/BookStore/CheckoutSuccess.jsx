import React, { useEffect } from "react";
import {  clearCartBook, getTotalBook } from "./Action/cartSliceBook";
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