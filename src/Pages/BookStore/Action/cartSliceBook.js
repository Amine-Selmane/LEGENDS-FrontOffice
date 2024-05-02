import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  bookItems: localStorage.getItem("bookItems")
    ? JSON.parse(localStorage.getItem("bookItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSliceBook = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartBook(state, action) { // Updated action name
      const { _id } = action.payload;
      const existingItem = state.bookItems.find(bookItem => bookItem._id === _id);

      if (existingItem) {
        existingItem.quantity += 1;
        toast.info("Increased book quantity", {
          position: "bottom-left",
        });
      } else {
        const newBookItem = { ...action.payload, quantity: 1 }; // Updated variable name
        state.bookItems.push(newBookItem); // Updated variable name
        toast.success("Book added to cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.bookItems));
    },

    decreaseCartBook(state, action) { // Updated action name
      const { _id } = action.payload;
      const existingItemIndex = state.bookItems.findIndex(bookItem => bookItem._id === _id);

      if (existingItemIndex === -1) return;

      const existingItem = state.bookItems[existingItemIndex];

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        toast.info("Decreased book quantity", {
          position: "bottom-left",
        });
      } else {
        state.bookItems.splice(existingItemIndex, 1);
        toast.error("Book removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.bookItems));
    },

    removeFromCartBook(state, action) { // Updated action name
      const { _id } = action.payload;
      const updatedCartItems = state.bookItems.filter(bookItem => bookItem._id !== _id);
      state.bookItems = updatedCartItems;
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      toast.error("Book removed from cart", {
        position: "bottom-left",
      });
    },

    getTotalBook(state, action) { // Updated action name
      const { total, quantity } = state.bookItems.reduce(
        (cartTotal, bookItem) => {
          const { price, quantity } = bookItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = parseFloat(total.toFixed(2));
    },

    clearCartBook(state, action) { // Updated action name
      state.bookItems = [];
      localStorage.removeItem("cartItems");
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
});

export const {
  addToCartBook,
  decreaseCartBook,
  removeFromCartBook,
  getTotalBook,
  clearCartBook
} = cartSliceBook.actions; // Updated action names
export const selectCartBookItems = state => state.cartBook.bookItems;

export default cartSliceBook.reducer;
