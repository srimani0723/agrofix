import React, { useState } from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    TextField,
    Container,
    Typography,
    InputAdornment,
    Box,
    Button,
    Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Zod schema for login
const loginSchema = z.object({
    username: z.string().min(3, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const onSuccessSubmit = (jwtToken, role) => {
        Cookies.set("jwt_token", jwtToken, { expires: 30 });
        Cookies.set("role", role, { expires: 30 });
        navigate(`/${role}/`)
    };

    const onSubmit = async (data) => {
        const URL = import.meta.env.VITE_API;
        const { username, password } = data;

        try {
            const response = await axios.post(`${URL}/api/login`, {
                username,
                password,
            });
            const resData = response.data;
            if (resData.status === "fail") {
                setErrorMsg(resData.error);
                return;
            }
            Cookies.set('username', username, { expires: 30 })
            onSuccessSubmit(resData.token, resData.role);
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
                minHeight: "100vh", // Centers vertically
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
                    Login
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
                            Login
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

                {/* Register Link */}
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ marginTop: 3, fontWeight: "bold" }}
                >
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        style={{
                            color: "#4285F4",
                            textDecoration: "none",
                        }}
                    >
                        Register
                    </a>
                </Typography>
            </Paper>
        </Container>
    );
};

export default LoginForm;