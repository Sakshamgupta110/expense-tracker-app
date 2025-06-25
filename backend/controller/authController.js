import { User } from "../models/User.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";

import jwt from "jsonwebtoken";
// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
// Register User
const registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;
  // Validation: Check for missing fields
  if (!fullName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    // Create the user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });
    const createdUser = await User.findById(user._id);
    if (!createdUser) {
      throw new ApiError(
        500,
        "Something when wrong while registering the user"
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User created successfully"));
  } catch (err) {
    res
      .status(500)
      .json({ message: "error registering user", error: err.message });
  }
};
// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new ApiError(400, "Email is required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid password");
    }
    const token = generateToken(user._id);
    // You can generate a token here if needed
    return res
      .status(200)
      .json(new ApiResponse(200, { user, token }, "Login successful"));
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Login failed" });
  }
};
// Register User
const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user info", error: err.message });
  }
};

export { registerUser, loginUser, getUserInfo };
