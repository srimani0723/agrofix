import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    TextField,
    Container,
    Typography,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    Paper,
    Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Validation schema
const registerSchema = z
    .object({
        username: z.string().min(3, "Username is required"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z
            .string()
            .min(8, "Confirm Password must be at least 8 characters"),
        role: z.enum(["buyer", "admin"], {
            message: "Role must be either Buyer or Admin",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(registerSchema),
    });
    const navigate = useNavigate();

    const selectedRole = watch("role");

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit = async (data) => {
        const URL = import.meta.env.VITE_API;
        const { username, password, confirmPassword, role } = data;

        try {
            const response = await axios.post(`${URL}/api/register`, {
                username,
                password,
                confirmPassword,
                role,
            });
            const resData = response.data;
            if (resData.status === "fail") {
                setErrorMsg(resData.error);
            }
            if (response.data.status === "success") {
                navigate("/login");
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: "2rem",
                    borderRadius: "1rem",
                    width: "100%",
                    maxWidth: "400px",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                        textAlign: "center",
                        color: "#4285F4", // Google blue
                        fontWeight: "bold",
                    }}
                >
                    Register
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                    {/* Username Field */}
                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        {...register("username")}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />

                    {/* Role Select Field */}
                    <FormControl fullWidth margin="normal" error={!!errors.role}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={selectedRole || ""}
                            onChange={(e) => setValue("role", e.target.value)}
                            label="Role"
                            {...register("role")}
                        >
                            <MenuItem value="buyer">Buyer</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Password Field */}
                    <TextField
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        margin="normal"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Box
                                        onClick={togglePasswordVisibility}
                                        role="button"
                                        aria-label="Toggle password visibility"
                                        sx={{
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            px: 1,
                                        }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </Box>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Confirm Password Field */}
                    <TextField
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        label="Confirm Password"
                        margin="normal"
                        {...register("confirmPassword")}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Box
                                        onClick={togglePasswordVisibility}
                                        role="button"
                                        aria-label="Toggle confirm password visibility"
                                        sx={{
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            px: 1,
                                        }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </Box>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Submit Button */}
                    <Box
                        sx={{
                            mt: 3,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: "#4285F4",
                                color: "white",
                                fontWeight: "bold",
                                padding: "12px",
                                "&:hover": {
                                    backgroundColor: "#357AE8",
                                },
                            }}
                        >
                            Register
                        </Button>
                    </Box>
                </form>

                {/* Error Message */}
                {errorMsg && (
                    <Typography
                        variant="body2"
                        color="error"
                        sx={{
                            marginTop: 2,
                            textAlign: "center",
                        }}
                    >
                        {errorMsg}
                    </Typography>
                )}

                {/* Login Link */}
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ marginTop: 3, fontWeight: "bold" }}
                >
                    Already have an account?{" "}
                    <a
                        href="/login"
                        style={{
                            color: "#4285F4",
                            textDecoration: "none",
                        }}
                    >
                        Login
                    </a>
                </Typography>
            </Paper>
        </Container>
    );
};

export default RegisterForm;