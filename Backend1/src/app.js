import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config();
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log(`Request type: ${req.method}, Content-Type: ${req.headers['content-type']}`);
  console.log('Body:', req.body);
  next();
});

import userRouter from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1", contactRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong', message: err.message });
});

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