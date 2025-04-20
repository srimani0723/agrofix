import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalPrice: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1; // Increase quantity
            } else {
                state.items.push({ ...product, quantity: 1 }); // Add product with quantity 1
            }

            state.totalPrice += Number(product.price);
        },
        decrementQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.items.find((item) => item.id === productId);

            if (item) {
                state.totalPrice -= Number(item.price);
                if (item.quantity > 1) {
                    item.quantity -= 1; // Decrease quantity
                } else {
                    state.items = state.items.filter((item) => item.id !== productId); // Remove if quantity reaches zero
                }
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            const item = state.items.find((item) => item.id === productId);

            if (item) {
                state.totalPrice -= Number(item.price) * item.quantity; // Subtract full amount
                state.items = state.items.filter((item) => item.id !== productId); // Remove item
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const { addToCart, decrementQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;