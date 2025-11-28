import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice"
import cartReducer from "./cartSlice"
const store = configureStore({
    reducer:{products: productReducer,
        cart: cartReducer,
    } 
});

export default store;