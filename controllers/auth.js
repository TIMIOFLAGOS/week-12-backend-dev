import bcrypt from "bcrypt";
import Auth from "../model/Auth.js";
import { generateToken, hashPassword } from "../utilities/utilities.js";

/**
 * Register User Endpoint
 */
export const registerUser = async (req, res) => {
  // Safely destructure req.body with a fallback empty object
  const { firstname, lastname, email, password, phoneNumber } = req.body || {};

  // Check for required fields
  if (!firstname || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields (firstname, email, password)",
    });
  }

  try {
    // Normalize email to lowercase for reliable checks
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const checkIfEmailExist = await Auth.findOne({ email: normalizedEmail });
    
    if (checkIfEmailExist) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash raw password
    const hashedPassword = await hashPassword(password);

    // Save new user
    const savedUser = await Auth.create({
      firstname,
      lastname,
      email: normalizedEmail,
      password: hashedPassword,
      phoneNumber,
    });

    return res.status(201).json({
      success: true,
      message: `${firstname}'s account was successfully created`,
      data: {
        id: savedUser._id,
        name: savedUser.firstname,
        emailAddress: savedUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Login User Endpoint
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide both email and password",
    });
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await Auth.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(password, user.password);

    if (!checkPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const accessToken = generateToken(user);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * Get User Profile Endpoint
 */
export const getUserProfile = async (req, res) => {
  try {
    const user = await Auth.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};