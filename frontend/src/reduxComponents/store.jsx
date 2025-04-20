import { configureStore } from "@reduxjs/toolkit";
import buyersReducer from "./buyersSlice"
import productsReducer from "./productsSlice"
import cartReducer from "./cartSlice";

const store = configureStore({
    reducer: {
        buyers: buyersReducer,
        products: productsReducer,
        cart: cartReducer
    },
});

export default store;