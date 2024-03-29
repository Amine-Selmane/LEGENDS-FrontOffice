import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, CLEAR_WISHLIST } from './wishlistActionTypes';

const initialState = {
  items: []
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return [...state, action.payload];
    case REMOVE_FROM_WISHLIST:
      return state.filter(item => item.id !== action.payload);
    case CLEAR_WISHLIST:
      return [];
    default:
      return state;
  }
};

  

export default wishlistReducer;
