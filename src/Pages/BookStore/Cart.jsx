import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decreaseCart, getTotals, removeFromCart ,addToCart } from "./Action/cartSlice";
import PayButton from "../BookStore/PayButton";
import { Link } from "react-router-dom";
import "./style.css" ;
import bookImage from './bookImage.jpg';


const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleDecreaseCart = (_id) => {
    dispatch(decreaseCart({ _id }));
  };

  const handleRemoveFromCart = (_id) => {
    dispatch(removeFromCart({ _id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>

          <div className="start-shopping">
            <Link to="/books">
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
              <span>Get your book now </span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="Book-title">Book</h3>
         <h3 className="quantity">Quantity</h3>
         <h3 className="quantity">Total</h3>


          </div>
          <div className="cart-items">
            {cart.cartItems.map((cartItem) => (
              <div className="cart-item" key={cartItem._id}>
                <div className="cart-event">
                <h3>{cartItem.title}</h3>

                  <img src={bookImage} alt={cartItem.title}  />
                  <p>Price: ${cartItem.price}</p>

                  <button className="remove-button" onClick={() => handleRemoveFromCart(cartItem._id)}>
  <span className="cross-icon">X</span>
</button>
                </div>
                <div className="cart-quantity">
                  <button onClick={() => handleDecreaseCart(cartItem._id)}>
                    -
                  </button>
                  <div className="count">{cartItem.quantity}</div>
                  <button onClick={() => dispatch(addToCart(cartItem))}>+</button>
                </div>
                
                <div className="cart-total-price">
                  ${cartItem.price * cartItem.quantity}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              {/* Include PayButton component if implemented */}
              <PayButton cartItems={cart.cartItems} />
             
              <div className="continue-shopping">
                <Link to="/books">
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
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
