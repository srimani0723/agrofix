const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (rolesAllowed) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user's role is allowed
    if (!rolesAllowed.includes(decoded.role)) {
      return res.status(403).json({ error: "Access denied" });
    }

    req.user = decoded; // Store user data in request object
    next(); // Proceed to route handler
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authenticateUser;
