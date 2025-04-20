import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LoginForm from "./components/Login";
import BuyersPage from "./pages/BuyersPage";
import AdminsPage from "./pages/AdminsPage";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";
import RegisterForm from "./components/Register";

const styleMain = {
  height: "100vh",
  width: "100%",
};

function App() {
  return (
    <Box sx={styleMain}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Protected Routes */}
        <Route
          path="/buyer/*"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <BuyersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminsPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback Routes */}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </Box>
  );
}

export default App;