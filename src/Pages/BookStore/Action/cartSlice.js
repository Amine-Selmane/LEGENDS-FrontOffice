import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
   
    addToCart(state, action) {
      const { _id } = action.payload; // Accessing eventId from payload
      const existingItem = state.cartItems.find(item => item._id === _id);

      if (existingItem) {
        existingItem.quantity += 1;
        toast.info("Increased book quantity", {
          position: "bottom-left",
        });
      } else {
        const newCartItem = { ...action.payload, quantity: 1 };
        state.cartItems.push(newCartItem);
        toast.success("Book added to cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },



    decreaseCart(state, action) {
      const { _id } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item._id === _id);

      if (existingItemIndex === -1) return;

      const existingItem = state.cartItems[existingItemIndex];
      
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        toast.info("Decreased book quantity", {
          position: "bottom-left",
        });
      } else {
        state.cartItems.splice(existingItemIndex, 1);
        toast.error("Book removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action) {
      const { _id } = action.payload;
      const updatedCartItems = state.cartItems.filter(item => item._id !== _id);
      state.cartItems = updatedCartItems;
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      toast.error("Book removed from cart", {
        position: "bottom-left",
      });
    },

    getTotals(state, action) {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
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

    clearCart(state, action) {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions;
  export const selectCartItems = state => state.cart.cartItems; // Selector function to retrieve cartItems from state

export default cartSlice.reducer;
