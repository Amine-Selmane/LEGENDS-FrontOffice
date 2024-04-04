import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSliceBook';
import wishlistReducer from './wishlistSlice';


const storeBook = configureStore({
  reducer: {
    cart: cartReducer,
wishlist:wishlistReducer,
  },
});

export default storeBook;
