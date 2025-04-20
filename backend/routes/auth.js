const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateRequestBody = require("../middlewares/validateRequestBody");
const router = express.Router();
const db = require("../db");
require("dotenv").config();

// POST /api/auth/register - User registration
router.post("/register", validateRequestBody, async (req, res) => {
  const { username, password, confirmPassword, role } = req.body;

  try {
    // Check if the username already exists
    const userExist = await db("users").where({ username }).first();
    if (userExist) {
      // User already exists
      return res.status(200).json({
        status: "fail",
        error: "Username already taken. Please choose a different username.",
      });
    }

    if (password !== confirmPassword) {
      // User already exists
      return res.status(200).json({
        status: "fail",
        error: "Passwords do not match",
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert the new user into the database
    await db("users").insert({
      username,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      status: "success",
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({
      error: "An error occurred during registration. Please try again.",
    });
  }
});

// POST /api/auth/login - Role-Based Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db("users").where({ username }).first();
    if (!user) {
      return res.status(200).json({ status: "fail", error: "User not found" });
    }

    // Compare input password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .json({ status: "fail", error: "Invalid password" });
    }

    // Generate JWT with user role
    const token = jwt.sign(
      { id: user.id, role: user.role }, // Embed user role in the token
      process.env.JWT_SECRET, // Secret key from .env file
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res
      .status(200)
      .json({
        status: "success",
        message: "Login successful!",
        token,
        role: user.role,
      });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

module.exports = router;
