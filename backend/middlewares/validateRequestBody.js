const validateRequestBody = (req, res, next) => {
  const requestBody = req.body;

  // Check if the request body is empty
  if (!requestBody || Object.keys(requestBody).length === 0) {
    return res.status(400).json({ error: "Request body cannot be empty" });
  }

  // Pass control to the next middleware or route handler
  next();
};

module.exports = validateRequestBody;
