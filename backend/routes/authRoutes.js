import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";

const router = express.Router();

// Register a new user
router.post("/signup", registerUser);

// Login a user
router.post("/login", loginUser);

// Logout a user
router.post("/logout", logoutUser);

export default router;