import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./style.css";

const BuyersDashboard = () => {
    const navigate = useNavigate();

    return (
        <Container className="dashboard-container">
            {/* Welcome Message */}
            <Typography variant="h4" className="welcome-text">
                Welcome to the Buyers Dashboard! 🌿🍎
            </Typography>
            <Typography variant="body1" className="subtext">
                Explore fresh fruits and vegetables with amazing offers!
            </Typography>

            {/* Store Button */}
            <Button
                variant="contained"
                color="primary"
                className="store-button"
                onClick={() => navigate("/buyer/store")}
            >
                Go to Store
            </Button>
        </Container>
    );
};

export default BuyersDashboard;