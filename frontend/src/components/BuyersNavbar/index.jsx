import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Menu,
    Box,
    MenuItem,
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Cookies from "js-cookie";

const BuyersNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    // Toggle drawer
    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev);
    };

    // Open and close dropdown menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Logout function
    const handleLogout = () => {
        Cookies.remove("jwt_token");
        Cookies.remove("role");
        Cookies.remove("username");
        navigate("/login");
        handleMenuClose();
    };

    // Check if route is active
    const isActiveRoute = (path) => location.pathname === path;

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                boxShadow: "none",
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                    }}
                >
                    Buyers Portal
                </Typography>

                {/* Hamburger menu for small screens */}
                {isSmallScreen ? (
                    <>
                        <IconButton color="inherit" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                            <List>
                                <ListItem
                                    component={Link}
                                    to="/buyer"
                                    onClick={handleDrawerToggle}
                                    sx={{
                                        backgroundColor: isActiveRoute("/buyer") ? "white" : "inherit",
                                        color: isActiveRoute("/buyer") ? theme.palette.primary.main : "inherit",
                                        fontWeight: "bold",
                                        "&:hover": {
                                            backgroundColor: "#f5f5f5",
                                            color: theme.palette.primary.main,
                                        },
                                    }}
                                >
                                    <ListItemText primary="Dashboard" />
                                </ListItem>
                                <ListItem
                                    component={Link}
                                    to="/buyer/orders"
                                    onClick={handleDrawerToggle}
                                    sx={{
                                        backgroundColor: isActiveRoute("/buyer/orders") ? "white" : "inherit",
                                        color: isActiveRoute("/buyer/orders") ? theme.palette.primary.main : "inherit",
                                        fontWeight: "bold",
                                        "&:hover": {
                                            backgroundColor: "#f5f5f5",
                                            color: theme.palette.primary.main,
                                        },
                                    }}
                                >
                                    <ListItemText primary="Orders" />
                                </ListItem>
                                <ListItem
                                    component={Link}
                                    to="/buyer/cart"
                                    onClick={handleDrawerToggle}
                                    sx={{
                                        backgroundColor: isActiveRoute("/buyer/cart") ? "white" : "inherit",
                                        color: isActiveRoute("/buyer/cart") ? theme.palette.primary.main : "inherit",
                                        fontWeight: "bold",
                                        "&:hover": {
                                            backgroundColor: "#f5f5f5",
                                            color: theme.palette.primary.main,
                                        },
                                    }}
                                >
                                    <ListItemText primary="Cart" />
                                </ListItem>
                                <ListItem
                                    component={Link}
                                    to="/buyer/store"
                                    onClick={handleDrawerToggle}
                                    sx={{
                                        backgroundColor: isActiveRoute("/buyer/store") ? "white" : "inherit",
                                        color: isActiveRoute("/buyer/store") ? theme.palette.primary.main : "inherit",
                                        fontWeight: "bold",
                                        "&:hover": {
                                            backgroundColor: "#f5f5f5",
                                            color: theme.palette.primary.main,
                                        },
                                    }}
                                >
                                    <ListItemText primary="Store" />
                                </ListItem>
                            </List>
                        </Drawer>
                    </>
                ) : (
                    // Standard navbar for medium and larger screens
                    <>
                        <Button
                            component={Link}
                            to="/buyer"
                            sx={{
                                backgroundColor: isActiveRoute("/buyer") ? "white" : "inherit",
                                color: isActiveRoute("/buyer") ? theme.palette.primary.main : "inherit",
                                margin: "0 8px",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "#f5f5f5",
                                    color: theme.palette.primary.main,
                                },
                            }}
                        >
                            Dashboard
                        </Button>
                        <Button
                            component={Link}
                            to="/buyer/orders"
                            sx={{
                                backgroundColor: isActiveRoute("/buyer/orders") ? "white" : "inherit",
                                color: isActiveRoute("/buyer/orders") ? theme.palette.primary.main : "inherit",
                                margin: "0 8px",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "#f5f5f5",
                                    color: theme.palette.primary.main,
                                },
                            }}
                        >
                            Orders
                        </Button>
                        <Button
                            component={Link}
                            to="/buyer/cart"
                            sx={{
                                backgroundColor: isActiveRoute("/buyer/cart") ? "white" : "inherit",
                                color: isActiveRoute("/buyer/cart") ? theme.palette.primary.main : "inherit",
                                margin: "0 8px",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "#f5f5f5",
                                    color: theme.palette.primary.main,
                                },
                            }}
                        >
                            Cart
                        </Button>
                        <Button
                            component={Link}
                            to="/buyer/store"
                            sx={{
                                backgroundColor: isActiveRoute("/buyer/store") ? "white" : "inherit",
                                color: isActiveRoute("/buyer/store") ? theme.palette.primary.main : "inherit",
                                margin: "0 8px",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "#f5f5f5",
                                    color: theme.palette.primary.main,
                                },
                            }}
                        >
                            Store
                        </Button>
                    </>
                )}

                {/* Profile Icon with Dropdown */}
                <Box>
                    <IconButton color="inherit" onClick={handleMenuOpen}>
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default BuyersNavbar;