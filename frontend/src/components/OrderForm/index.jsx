import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../reduxComponents/cartSlice"; // Import the clearCart action
import axios from "axios";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import Cookies from "js-cookie";

const OrderForm = ({ items, onClose }) => {
    const dispatch = useDispatch(); // Initialize Redux dispatch
    const [orderDetails, setOrderDetails] = useState({
        buyer_name: "",
        buyer_contact: "",
        delivery_address: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
    };

    const handleOrderSubmit = async () => {
        const API_URL = import.meta.env.VITE_API

        const username = Cookies.get('username');

        const res = await axios.post(`${API_URL}/api/orders`, {
            buyer_id: username,
            ...orderDetails,
            items: JSON.stringify(items), // Convert cart items to JSON for the backend
            status: "pending", // Default status
        });

        console.log(res);

        setSuccessMessage("Order placed successfully!");
        setErrorMessage("");
        dispatch(clearCart());
        onClose();
        // } catch (error) {
        //     console.error("Error placing order:", error);
        //     setErrorMessage("Failed to place order. Please try again."); 
        //     setSuccessMessage("");
        // }
    };

    return (
        <Container sx={{ padding: "20px" }}>
            <Typography variant="h5">Place Your Order</Typography>

            {/* Error and Success Messages */}
            {errorMessage && <Alert severity="error" sx={{ marginTop: "10px" }}>{errorMessage}</Alert>}
            {successMessage && <Alert severity="success" sx={{ marginTop: "10px" }}>{successMessage}</Alert>}

            <TextField
                label="Name"
                name="buyer_name"
                fullWidth
                margin="normal"
                onChange={handleChange}
            />
            <TextField
                label="Contact"
                name="buyer_contact"
                fullWidth
                margin="normal"
                onChange={handleChange}
            />
            <TextField
                label="Address"
                name="delivery_address"
                fullWidth
                margin="normal"
                onChange={handleChange}
            />

            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: "20px" }}
                onClick={handleOrderSubmit}
            >
                Confirm Order
            </Button>
        </Container>
    );
};

export default OrderForm;