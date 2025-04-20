import React from "react";
import Cookies from "js-cookie"; // To access cookies
import { Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Define role-based messages and actions
const roleMessages = {
    admin: {
        message: "Page Not Found or Unauthorized",
        details: "Admins can contact support for more information.",
        actions: [
            { label: "Go to Dashboard", path: "/admin/dashboard" },
            { label: "Go Home", path: "/" },
        ],
    },
    buyer: {
        message: "Page Not Found or Unauthorized",
        details: "Buyers can navigate back to the store or home.",
        actions: [
            { label: "Visit Store", path: "/buyer" },
            { label: "Go Home", path: "/buyer" },
        ],
    },
    default: {
        message: "Page Not Found",
        details: "The requested page doesn't exist or you're not authorized to access it.",
        actions: [{ label: "Go Back", path: "/login" }],
    },
};

const NotFound = () => {
    const navigate = useNavigate();
    const role = Cookies.get("role") || "default";
    const { message, details, actions } = roleMessages[role] || roleMessages.default;

    return (
        <Container
            maxWidth="sm"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <Typography variant="h1" component="div" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" gutterBottom>
                {message}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                {details}
            </Typography>
            <div style={{ marginTop: "20px" }}>
                {actions.map((action, index) => (
                    <Button
                        key={index}
                        variant={index === 0 ? "contained" : "outlined"} // Primary for the first action
                        color="primary"
                        onClick={() => navigate(action.path)}
                        style={{ margin: "10px" }}
                    >
                        {action.label}
                    </Button>
                ))}
            </div>
        </Container>
    );
};

export default NotFound;