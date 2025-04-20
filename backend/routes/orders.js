const express = require("express");
const db = require("../db");
const authenticateUser = require("../middlewares/authorizer");
const router = express.Router();

// GET /api/orders/:id - View order details (buyers)
router.get("/:id", authenticateUser(["buyer"]), async (req, res) => {
  const { id } = req.params;

  try {
    const buyerId = id;
    const order = await db.raw(`
      SELECT * 
      FROM orders 
      WHERE buyer_id LIKE '%${buyerId}}%' 
      ORDER BY id ASC
  `);

    console.log(order);

    if (order.length > 0) {
      res.json(order);
    } else {
      res.status(404).json({ status: "fail", error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order details" });
  }
});

// GET /api/orders - View all orders (admins)
router.get("/", authenticateUser(["admin"]), async (req, res) => {
  try {
    const orders = await db.select("*").from("orders");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// POST /api/orders - Place a new order
router.post("/", async (req, res) => {
  const { buyer_id, buyer_name, buyer_contact, delivery_address, items } =
    req.body;
  console.log(req.body);
  try {
    await db("orders").insert({
      buyer_id,
      buyer_name,
      buyer_contact,
      delivery_address,
      items: JSON.stringify(items),
      status: "pending",
    });
    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

// PUT /api/orders/:id - Update order status (admins)
router.put("/:id", authenticateUser(["admin"]), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await db("orders").where({ id }).update({ status });
    res.json({ message: "Order status updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
});

module.exports = router;
