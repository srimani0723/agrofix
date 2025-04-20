import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity, removeFromCart } from "../../reduxComponents/cartSlice";
import OrderForm from "../OrderForm";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Button,
    Box,
    Dialog,
    Grow,
} from "@mui/material";

const Cart = () => {
    const dispatch = useDispatch();
    const { items, totalPrice } = useSelector((state) => state.cart);
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    return (
        <Container
            sx={{
                width: "100%", // Ensures cart takes full screen width
                minHeight: "calc(100vh - 64px)", // Adjust height, assuming navbar height is 64px
                display: "flex",
                flexDirection: "column",
                paddingBottom: "50px",
            }}
        >
            <Typography variant="h4" sx={{ textAlign: "", marginBottom: "20px", fontWeight: 'bold' }}>
                Your Cart
            </Typography>


            {items.length > 0 ? (

                <Box sx={{ width: '100%' }}>
                    <Grid container spacing={2} justifyContent="center">
                        {items.map((product) => (
                            <Grid item key={product.id}>
                                <Card sx={{ display: "flex", alignItems: 'center', justifyContent: 'flex-start', width: "100%" }}>
                                    {/* Image Section */}
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 150, height: 150 }}
                                        image={product.image_url || "https://via.placeholder.com/150"}
                                        alt={product.name}
                                    />

                                    {/* Content Section */}
                                    <CardContent
                                        sx={{
                                            flex: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="h6">{product.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {product.description || "No description available."}
                                            </Typography>
                                            <Typography variant="h6" color="primary" sx={{ marginTop: "8px" }}>
                                                ${Math.floor(product.price)} {/* Ensure integer price */}
                                            </Typography>
                                            <Typography variant="body1" sx={{ marginTop: "8px" }}>
                                                Quantity: {product.quantity}
                                            </Typography>
                                        </Box>

                                        {/* Quantity Controls */}
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: "8px" }}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => dispatch(decrementQuantity(product.id))}
                                            >
                                                -
                                            </Button>
                                            <Typography variant="body1">{product.quantity}</Typography>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => dispatch(addToCart(product))}
                                            >
                                                +
                                            </Button>
                                        </Box>
                                    </CardContent>

                                    {/* Remove Button */}
                                    <Button
                                        variant="contained"
                                        color="error"
                                        sx={{ alignSelf: "center", marginRight: 2 }}
                                        onClick={() => dispatch(removeFromCart(product.id))}
                                    >
                                        Remove
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Bottom Section - Total Price + Checkout */}
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            flexDirection: "column",
                            marginTop: "30px",
                            paddingTop: "20px",
                            borderTop: "2px solid #ddd",
                        }}
                    >
                        {/* Total Price */}
                        <Typography variant="h6" sx={{ marginBottom: "20px", fontWeight: 'bold', fontSize: 'large' }}>
                            Total Price: ${Math.floor(totalPrice)}
                        </Typography>

                        {/* Checkout Button */}
                        <Button
                            variant="contained"
                            color="success"
                            sx={{}}
                            onClick={() => setCheckoutOpen(true)}
                        >
                            Checkout
                        </Button>
                    </Box>

                    {/* Checkout Form Popup */}
                    <Dialog open={checkoutOpen} onClose={() => setCheckoutOpen(false)} fullWidth maxWidth="sm">
                        <OrderForm items={items} onClose={() => setCheckoutOpen(false)} />
                    </Dialog>
                </Box>
            ) : (
                <Typography sx={{ textAlign: "center", marginTop: "20px" }}>
                    Your cart is empty.
                </Typography>
            )}
        </Container>
    );
};

export default Cart;