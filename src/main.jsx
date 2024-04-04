import React from "react";
import ReactDOM from "react-dom/client";
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
