import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  items: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [], // Provide default value as an empty array if local storage is empty or undefined
};


const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const { _id } = action.payload; // Accessing book ID from payload
      const existingItem = state.items.find(item => item._id === _id);

      if (existingItem) {
        toast.info("Book already in wishlist", {
          position: "bottom-left",
        });
      } else {
        state.items.push(action.payload);
        toast.success("Book added to wishlist", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },

    removeFromWishlist(state, action) {
      const itemId = action.payload;
      state.items = state.items.filter(item => item._id !== itemId);
      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
      toast.error("Book removed from wishlist", {
        position: "bottom-left",
      });
    },

    clearWishlist(state, action) {
      state.items = [];
      localStorage.removeItem("wishlistItems");
      toast.error("Wishlist cleared", { position: "bottom-left" });
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
