import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSliceBook';
import wishlistReducer from './wishlistSlice';


const store = configureStore({
  reducer: {
    cart: cartReducer,
wishlist:wishlistReducer,
  },
});

export default store;
