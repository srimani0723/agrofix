import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Orders from "../../components/BuyersOrders";
import DashboardHome from "../../components/BuyersDashboard";
import BuyersNavbar from "../../components/BuyersNavbar";
import BuyersStore from "../../components/BuyersStore";
import Cart from "../../components/BuyersCart";
import Cookies from "js-cookie";

const BuyersPage = () => {
    const navigate = useNavigate();
    const role = Cookies.get('role');
    const jwtToken = Cookies.get('jwt_token');
    if (!role && !jwtToken) {
        navigate('/login')
    }

    return (
        <div>
            <BuyersNavbar />
            <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/store" element={<BuyersStore />} />
            </Routes>
        </div>
    );
};

export default BuyersPage;