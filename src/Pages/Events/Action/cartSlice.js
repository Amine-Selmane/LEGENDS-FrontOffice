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
      const { eventId, name, price,imageUrl } = action.payload;
      const existingItem = state.cartItems.find(item => item.eventId === eventId);

      if (existingItem) {
        existingItem.quantity += 1;
        toast.info("Increased event quantity", {
          position: "bottom-left",
        });
      } else {
        const newCartItem = { eventId, name, price,imageUrl, quantity: 1 };
        state.cartItems.push(newCartItem);
        toast.success("Event added to cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    
    decreaseCart(state, action) {
      const { eventId } = action.payload;
      const existingItem = state.cartItems.find(item => item.eventId === eventId);

      if (!existingItem) return;

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        toast.info("Decreased event quantity", {
          position: "bottom-left",
        });
      } else {
        state.cartItems = state.cartItems.filter(item => item.eventId !== eventId);
        toast.error("Event removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    
    removeFromCart(state, action) {
      const { eventId } = action.payload;
      state.cartItems = state.cartItems.filter(item => item.eventId !== eventId);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Event removed from cart", {
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

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
