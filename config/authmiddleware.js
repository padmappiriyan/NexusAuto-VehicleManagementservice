import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    // Spring Boot secret key (Base64 encoded)
    const base64Secret = "f1XbHANYbOHvOm6Jq+qNdvdZEP43/0qnwjGWhq+cG8Y=";

    // Decode it before using
    const decodedSecret = Buffer.from(base64Secret, "base64");

    // Verify the token using HS256 (the same as Spring Boot)
    const decoded = jwt.verify(token, decodedSecret, { algorithms: ["HS256"] });
    console.log("Decoded JWT:", decoded);

    
    req.user = decoded;
    console.log(decoded.userId);
    req.userEmail = decoded.sub; 
    req.customerId=decoded.userId;

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
