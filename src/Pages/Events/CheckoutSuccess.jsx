import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { clearCart, getTotals } from "./Action/cartSlice";
import React from 'react';
import Recommendations from "./Recommendations"; // Import the Recommendations component

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
    <Container>
      <SuccessContainer>
        <h2>Checkout Successful</h2>
        <p>Your reservation details will be sent to your email</p>
        <p>Thank you for joining us!</p>
        <p>
          In case of any inquiries, contact support at{" "}
          <strong>ElKindy@onlineshop.com</strong>
        </p>
      </SuccessContainer>
      
      {/* Include the Recommendations component here */}
      <RecommendationsContainer>
        <Recommendations />
      </RecommendationsContainer>
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
`;

const SuccessContainer = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h2 {
    margin-bottom: 0.5rem;
    color: #029e02;
  }
`;

const RecommendationsContainer = styled.div`
  width: 100%;
`;
