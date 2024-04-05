import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, CLEAR_WISHLIST } from './wishlistActionTypes';

// Action creator for adding an item to the wishlist
export const addToWishlist = (item) => {
  return {
    type: ADD_TO_WISHLIST,
    payload: item
  };
};

// Action creator for removing an item from the wishlist
export const removeFromWishlist = (itemId) => {
  return {
    type: REMOVE_FROM_WISHLIST,
    payload: itemId
  };
};

// Action creator for clearing the wishlist
export const clearWishlist = () => {
  return {
    type: CLEAR_WISHLIST
  };
};
