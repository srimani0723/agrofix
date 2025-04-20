import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
    Button,
} from "@mui/material";
import Cookies from "js-cookie";

const BuyersOrder = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            const API_URL = import.meta.env.VITE_API
            try {
                const username = Cookies.get('username');
                const jwtToken = Cookies.get('jwt_token')
                const response = await axios.get(`${API_URL}/api/orders/:${username}`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setErrorMessage("Failed to fetch orders. Please try again.");
            }
        };

        fetchOrders();
    }, []);

    return (
        <Container sx={{ width: "100%", marginTop: "20px" }}>
            <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "20px" }}>
                Buyer Orders
            </Typography>

            {errorMessage && (
                <Typography color="error" sx={{ textAlign: "center", marginBottom: "20px" }}>
                    {errorMessage}
                </Typography>
            )}

            {orders.length > 0 ? (
                <Grid container spacing={2}>
                    {orders.map((order) => (
                        <Grid item xs={12} sm={6} md={4} key={order.id}>
                            <Card
                                sx={{ cursor: "pointer" }}
                                onClick={() => setSelectedOrder(order)} // Open popup on click
                            >
                                <CardContent>
                                    <Typography variant="h6">Order ID: {order.id}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Buyer Name: {order.buyer_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Contact: {order.buyer_contact}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Status: {order.status}
                                    </Typography>
                                    <Typography variant="body2" color="primary">
                                        Total Items: {JSON.parse(order.items).length}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography sx={{ textAlign: "center", marginTop: "20px" }}>
                    No orders available.
                </Typography>
            )}

            {/* Popup Dialog to Show Detailed Order */}
            <Dialog
                open={Boolean(selectedOrder)}
                onClose={() => setSelectedOrder(null)} // Close popup on dismiss
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Order Details (ID: {selectedOrder?.id})
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                        Buyer Name: {selectedOrder?.buyer_name}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                        Contact: {selectedOrder?.buyer_contact}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                        Address: {selectedOrder?.delivery_address}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                        Status: {selectedOrder?.status}
                    </Typography>
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                        Ordered Items:
                    </Typography>
                    <ul>
                        {selectedOrder &&
                            JSON.parse(selectedOrder.items).map((item, index) => (
                                <li key={index}>
                                    {item.name} (Quantity: {item.quantity})
                                </li>
                            ))}
                    </ul>
                </DialogContent>
                <Button
                    variant="contained"
                    color="error"
                    sx={{ margin: "10px auto", display: "block" }}
                    onClick={() => setSelectedOrder(null)}
                >
                    Close
                </Button>
            </Dialog>
        </Container>
    );
};

export default BuyersOrder;