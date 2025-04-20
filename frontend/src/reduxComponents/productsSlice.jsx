import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const API_URL = import.meta.env.VITE_API; // Ensure this is correctly set
    const jwtToken = Cookies.get("jwt_token"); // Check if JWT token exists

    if (!jwtToken) {
        throw new Error("JWT token not found."); // Handle missing token
    }

    console.log(jwtToken)
    try {
        console.log(API_URL);
        const response = await axios.get(`${API_URL}/api/products`, {
            headers: { // Pass headers properly
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        console.log("Fetched products:", response.data); // Debugging log
        return response.data; // Ensure response is an array
    } catch (error) {
        console.error("Error fetching products:", error.response || error.message);
        throw error; // Propagate error to Redux
    }
});

// Redux slice
const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: [], // Product list
        loading: false,
        error: null, // Error state
    },
    reducers: {}, // No reducers defined for now
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true; // Set loading state
                state.error = null; // Clear previous errors
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false; // Clear loading state
                state.items = Array.isArray(action.payload) ? action.payload : []; // Update items
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false; // Clear loading state
                state.error = action.error.message || "Failed to fetch products."; // Set error state
            });
    },
});

export default productsSlice.reducer;