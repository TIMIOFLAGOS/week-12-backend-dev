// 



import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import configs from "../config/config.js"; // Default import match

const { JWT_SECRET, JWT_EXPIRES_IN } = configs;

/**
 * Hash Password
 * @param {string} password - Raw plain-text password
 */
export const hashPassword = async (password) => {
  try {
    if (!password) {
      throw new Error("Password string is required for hashing");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error; // Re-throw so the controller handles it properly
  }
};

/**
 * Compare Password
 * @param {string} password - Raw password
 * @param {string} hashedPassword - Encrypted hash from database
 */
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generate JWT Token
 * @param {object} user - User/Student Mongoose document
 */
export const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
     
      name: user.firstname || user.name || "",
      role:user.role
    },
    JWT_SECRET || "fallback_secret_key",
    {
      expiresIn: JWT_EXPIRES_IN || "1d",
    }
  );
};