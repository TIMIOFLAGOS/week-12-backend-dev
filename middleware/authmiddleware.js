import jwt from "jsonwebtoken";
import configs from "../config/config.js";

const { JWT_SECRET } = configs;

/**
 * Middleware to authenticate requests using JWT
 */
export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Access token missing or invalid.",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token using the consistent config secret
    const secret = process.env.JWT_ACCESS_SECRET || JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    // Attach decoded payload and ensure 'id' is mapped consistently
    req.user = {
      ...decoded,
      id: decoded.userId || decoded.id, // Handles both naming conventions
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

/**
 * Middleware to authorize requests based on user roles
 * @param {...string} allowedRoles - Roles allowed to access the route
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }

    next();
  };
};