import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice"
import cartReducer from "./cartSlice"
import authReducer from "./authSlice"
import wishlistReducer from "./wishlistSlice"

const store = configureStore({
    reducer:{
        products: productReducer,
        cart: cartReducer,
        auth: authReducer,
        wishlist : wishlistReducer,
    } 
});

export default store;