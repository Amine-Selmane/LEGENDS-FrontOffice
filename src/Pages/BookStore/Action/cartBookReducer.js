import { ADD_TO_CART_BOOK, REMOVE_FROM_CART_BOOK, CLEAR_CART_BOOK } from './cartActionTypes';

const initialState = {
  bookItems: []
};

const cartBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_BOOK:
      return {
        ...state,
        bookItems: [...state.bookItems, action.payload]
      };
    case REMOVE_FROM_CART_BOOK:
      return {
        ...state,
        bookItems: state.bookItems.filter(bookItem => bookItem.id !== action.payload)
      };
    case CLEAR_CART_BOOK:
      return {
        ...state,
        bookItems: []
      };
    default:
      return state;
  }
};

export default cartBookReducer;   
