import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./cartStyle.css";
import {
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
  addToCart,
} from "./Action/cartSlice";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";
import PayButton from "./PayButton";
const PaymentMethods = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleDecreaseCart = (eventId) => {
    dispatch(decreaseCart({ eventId }));
    dispatch(getTotals()); // Update totals after decreasing quantity
  };

  const handleAddToCart = (eventId) => {
    dispatch(addToCart({ eventId })); // Dispatch addToCart action with event ID as payload
  };

  const handleRemoveFromCart = (eventId) => {
    dispatch(removeFromCart({ eventId }));
    dispatch(getTotals()); // Update totals after removing item
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(getTotals()); // Update totals after clearing cart
  };

  const handleQuantityChange = (eventId, newQuantity) => {
    if (newQuantity > 0) {
      const updatedItem = { ...cart.cartItems.find(item => item.eventId === eventId), quantity: newQuantity };
      dispatch(addToCart(updatedItem));
      dispatch(getTotals()); // Update totals after changing quantity
    }
  };

  return (
    <section className="h-100 gradient-custom">
      <MDBContainer className="py-5 h-100">
        {cart.cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is currently empty</p>
            <div className="start-shopping">
              <Link to="/EventList">
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            {cart.cartItems.map((cartItem) => (
              <MDBCard key={cartItem.eventId} className="mb-4">
                <MDBCardHeader className="py-3">
                  <MDBTypography tag="h5" className="mb-0">
                    {cartItem.name}
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                      <MDBCardImage src={cartItem.imageUrl} className="w-100" alt={cartItem.name} />
                    </MDBCol>

                    <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                      <p>
                        <strong>{cartItem.name}</strong>
                      </p>
                      <p>Price: ${cartItem.price}</p>
                      <p>Quantity: {cartItem.quantity}</p>

                      <MDBTooltip wrapperProps={{ size: "sm" }} wrapperClass="me-1 mb-2" >
                        <MDBBtn className="px-3 me-2 custom-btn" onClick={() => handleRemoveFromCart(cartItem.eventId)}>
                          <i className="fas fa-trash-alt"></i>
                        </MDBBtn>
                      </MDBTooltip>
                    </MDBCol>
                    <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                      <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                        <MDBBtn className="px-3 me-2 custom-btn" onClick={() => handleDecreaseCart(cartItem.eventId)}>
                          <i className="fas fa-minus"></i>
                        </MDBBtn>

                        <MDBInput
                          value={cartItem.quantity}
                          min={0}
                          type="number"
                          onChange={(e) => handleQuantityChange(cartItem.eventId, parseInt(e.target.value))}
                        />

                        <MDBBtn className="px-3 ms-2 custom-btn" onClick={() => handleQuantityChange(cartItem.eventId, cartItem.quantity + 1)}>
                          <i className="fas fa-plus"></i>
                        </MDBBtn>
                      </div>

                      <p className="text-start text-md-center">
                        <strong>Total Price: ${cartItem.price * cartItem.quantity}</strong>
                      </p>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            ))}

            <MDBCard className="mb-4">
              <MDBCardBody>
                <p>
                  <strong>Total Amount</strong>
                </p>
                <p className="mb-0">${cart.cartTotalAmount}</p>
              </MDBCardBody>
            </MDBCard>

            <MDBBtn block size="lg" onClick={handleClearCart}>
              Clear Cart
            </MDBBtn>
          
            <PayButton cartItems={cart.cartItems} />
           
          </>
        )}
      </MDBContainer>
    </section>
  );
};

export default PaymentMethods;
