import axios from "axios";
import { MDBBtn } from "mdb-react-ui-kit";
import { url } from "./Action/api";

const PayButton = ({ cartItems }) => {
  const handleCheckout = () => {
    axios.post(`${url}/create-checkout-session`, {
        cartItems,
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
