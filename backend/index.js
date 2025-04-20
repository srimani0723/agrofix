const express = require("express");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth"); // Optional authentication
const cors = require("cors");
const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from frontend
  })
);

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", authRoutes); // Optional authentication

app.get("/", (req, res) => {
  res.send("API is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
