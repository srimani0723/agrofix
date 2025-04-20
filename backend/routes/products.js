const express = require("express");
const db = require("../db");
const { v4: uuidv4 } = require("uuid");
const validateRequestBody = require("../middlewares/validateRequestBody");
const authenticateUser = require("../middlewares/authorizer");
const router = express.Router();

// GET /api/products - Fetch the product catalogue
router.get("/", async (req, res) => {
  try {
    const products = await db.select("*").from("products");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST /api/products - Add a new product (admins)
router.post(
  "/",
  validateRequestBody,
  authenticateUser(["admin"]),
  async (req, res) => {
    try {
      const id = uuidv4();
      await db("products").insert({
        id,
        name: req.body.name,
        image_url: req.body.image_url,
        price: parseFloat(req.body.price),
        category: req.body.category,
      });

      res.status(201).json({
        message: "Product added successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to add product", msg: error });
    }
  }
);

// PUT /api/products/:id - Edit an existing product (admins)
router.put("/:id", authenticateUser(["admin"]), async (req, res) => {
  const { id } = req.params;
  try {
    await db("products")
      .where({ id })
      .update({ ...req.body });
    res.json({ message: "Product updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE /api/products/:id - Remove a product (admins)
router.delete("/:id", authenticateUser(["admin"]), async (req, res) => {
  const { id } = req.params;
  try {
    await db("products").where({ id }).del();
    res.json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
