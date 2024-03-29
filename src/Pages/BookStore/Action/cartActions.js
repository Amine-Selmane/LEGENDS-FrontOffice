import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './cartActionTypes';

// Action creators for adding an item to the cart
export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item
  };
};

// Action creators for removing an item from the cart
export const removeFromCart = (itemId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: itemId
  };
};

// Action creators for clearing the cart
export const clearCart = () => {
  return {
    type: CLEAR_CART
  };
};
