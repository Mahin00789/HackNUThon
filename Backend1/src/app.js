import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config();
const app = express();

// Middleware for parsing requests
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(express.static("public"));

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

// Request logging middleware
app.use((req, res, next) => {
  console.log(
    `➡️ Request: ${req.method} ${req.url} | Content-Type: ${req.headers["content-type"]}`
  );
  console.log("Body:", JSON.stringify(req.body, null, 2));
  next();
});

// Route Imports
import authRoutes from "./routes/auth.route.js";
import bookingRoutes from "./routes/booking.route.js";
import userReg from "./routes/user.route.js";

app.use("/api/v1/users", userReg);

app.use("/api/auth", authRoutes);

app.use("/api/booking", bookingRoutes);

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({
    error: "Something went wrong",
    message: err.message || "Internal Server Error",
  });
});

// Connect to Database and Start Server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });

export { app };
