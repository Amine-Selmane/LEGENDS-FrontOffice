import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";

import "./index.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom';

import cartReducer, { getTotals } from "./Pages/Events/Action/cartSlice.js";
import cartBookReducer, { getTotal } from "./Pages/BookStore/Action/cartSliceBook.js";
import wishlistReducer from "./Pages/BookStore/Action/wishlistSlice.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Combine reducers
const rootReducer = {
  cart: cartReducer,
  cartBook: cartBookReducer,
  wishlist: wishlistReducer,
};

// Create Redux store
const store = configureStore({
  reducer: rootReducer,
});

// Dispatch initial actions
store.dispatch(getTotals());
store.dispatch(getTotal());



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);