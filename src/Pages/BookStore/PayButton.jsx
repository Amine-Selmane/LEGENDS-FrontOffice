import axios from "axios";
import { MDBBtn } from "mdb-react-ui-kit";
import { url } from "./Action/api";
import React from 'react';

const PayButton = ({ bookItems }) => {
  const handleCheckout = () => {
    axios.post(`${url}/stripe/create-checkout-session`, {
      bookItems,
    })

      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
       <MDBBtn onClick={() => handleCheckout()} block size="lg">
          Check out
       </MDBBtn>
    </>
  );
};

export default PayButton;