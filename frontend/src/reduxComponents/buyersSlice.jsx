import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    orders: [],
};

const buyersSlice = createSlice({
    name: "buyers",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.orders = [];
        },
    },
});

export const { setUser, setOrders, clearUser } = buyersSlice.actions;
export default buyersSlice.reducer;