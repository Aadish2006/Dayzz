import jwt from "jsonwebtoken";

export default function (req, res, next) {
  // Extract the header value
  const authHeader = req.header("Authorization");
  
  // 1. Check if Authorization header is present
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // 2. Check if the header is in "Bearer <token>" format
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ msg: "Invalid token format. Expected: Bearer <token>" });
  }

  const token = parts[1]; // Get the token part

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // { id: ... }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}