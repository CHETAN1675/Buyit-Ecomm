import { createSlice } from "@reduxjs/toolkit";

const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: storedCart,
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find(p => p.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(p => p.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(p => p.id === id);

      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart(state) {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
