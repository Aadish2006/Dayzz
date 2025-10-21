import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const router = express.Router();
import { signIn, signUp } from "../controllers/auth.js";
// Register
router.post("/register", signUp);

// Login
router.post("/login", signIn);

export default router;
