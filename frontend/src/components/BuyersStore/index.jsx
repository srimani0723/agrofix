import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../reduxComponents/productsSlice";
import { addToCart, decrementQuantity, removeFromCart } from "../../reduxComponents/cartSlice";
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CircularProgress,
    Alert,
    Button,
    Box,
} from "@mui/material";

const BuyersStore = () => {
    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector((state) => state.products);
    const cartItems = useSelector((state) => state.cart.items); // Get cart items

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const getProductQuantity = (productId) => {
        const item = cartItems.find((item) => item.id === productId);
        return item ? item.quantity : 0;
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: "center" }}>
                Buyer Store
            </Typography>

            {loading ? (
                <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <Grid container spacing={4}>
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((product) => {
                            const quantity = getProductQuantity(product.id);
                            return (
                                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                    <Card>
                                        <CardMedia component="img" height="140" image={product.image_url || "https://via.placeholder.com/150"} alt={product.name} />
                                        <CardContent>
                                            <Typography variant="h6">{product.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {product.description || "No description available."}
                                            </Typography>
                                            <Typography variant="body1" color="primary" sx={{ marginTop: "8px" }}>
                                                ${product.price}
                                            </Typography>

                                            {/* Quantity Controls */}
                                            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                                                <Button variant="contained" color="secondary" onClick={() => dispatch(decrementQuantity(product.id))} disabled={quantity === 0}>
                                                    -
                                                </Button>
                                                <Typography variant="body1" sx={{ margin: "0 10px" }}>{quantity}</Typography>
                                                <Button variant="contained" color="primary" onClick={() => dispatch(addToCart(product))}>
                                                    +
                                                </Button>
                                            </Box>

                                            {/* Remove from Cart Button */}
                                            {quantity > 0 && (
                                                <Button variant="contained" color="error" fullWidth sx={{ marginTop: "8px" }} onClick={() => dispatch(removeFromCart(product.id))}>
                                                    Remove from Cart
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })
                    ) : (
                        <Typography variant="body1" sx={{ textAlign: "center", marginTop: "20px" }}>
                            No products available.
                        </Typography>
                    )}
                </Grid>
            )}
        </Container>
    );
};

export default BuyersStore;