import { ADD_TO_CART_BOOK, REMOVE_FROM_CART_BOOK, CLEAR_CART_BOOK } from './cartActionTypes';

// Action creator for adding an item to the book cart
export const addToCartBook = (item) => {
  return {
    type: ADD_TO_CART_BOOK,
    payload: item
  };
};

// Action creator for removing an item from the book cart
export const removeFromCartBook = (itemId) => {
  return {
    type: REMOVE_FROM_CART_BOOK,
    payload: itemId
  };
};

// Action creator for clearing the book cart
export const clearCartBook = () => {
  return {
    type: CLEAR_CART_BOOK
  };
};
