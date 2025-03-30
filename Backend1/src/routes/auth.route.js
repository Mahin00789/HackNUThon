import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";


const router = express.Router();

// Admin Credentials (Hardcoded)
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "Admin@123"; // Store securely in env variables in production

// JWT Secret Keys (Replace with env variables)
const ACCESS_TOKEN_SECRET = "your_access_secret";
const REFRESH_TOKEN_SECRET = "your_refresh_secret";
let refreshTokens = [];

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// User & Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const accessToken = jwt.sign({ role: "admin" }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
      const refreshToken = jwt.sign({ role: "admin" }, REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);
      return res.json({ role: "admin", accessToken, refreshToken });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign({ id: user._id, role: "user" }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ id: user._id, role: "user" }, REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);

    res.json({ role: "user", accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
});

// Refresh Token Endpoint
router.post("/token", (req, res) => {
  const { token } = req.body;
  if (!token || !refreshTokens.includes(token)) return res.sendStatus(403);

  jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const newAccessToken = jwt.sign({ id: user.id, role: user.role }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    res.json({ accessToken: newAccessToken });
  });
});

// Logout
router.post("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((t) => t !== req.body.token);
  res.sendStatus(204);
});

export default router;
