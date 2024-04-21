import { configureStore } from '@reduxjs/toolkit';
import cartBookReducer from './cartSliceBook'; // Updated import name
import wishlistReducer from './wishlistSlice';

const store = configureStore({
  reducer: {
    cart: cartBookReducer, // Updated reducer name
    wishlist: wishlistReducer,
  },
});

export default store;
