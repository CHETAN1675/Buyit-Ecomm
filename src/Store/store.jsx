import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice"
import cartReducer from "./cartSlice"
import authReducer from "./authSlice"

const store = configureStore({
    reducer:{products: productReducer,
        cart: cartReducer,
        auth: authReducer,
    } 
});

export default store;