
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";

import "./index.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import {  configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import cartReducer, { getTotals } from "./Pages/Events/Action/cartSlice.js";


const store = configureStore({
  reducer:{
     cart: cartReducer,
    },
});

store.dispatch(getTotals());

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartReducer, { getTotals } from "./Pages/BookStore/Action/cartSlice.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import wishlistReducer from "./Pages/BookStore/Action/wishlistSlice.js";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,

    
  },
});

store.dispatch(getTotals());
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
      
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);