import express from "express";
import jwt from "jsonwebtoken";
import Booking from "../model/bookingshcema.model.js";
import User from "../model/user.model.js";

const router = express.Router();
const ACCESS_TOKEN_SECRET = "your_access_secret";

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);

  jwt.verify(token.split(" ")[1], ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// User requests soil test
router.post("/request", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "user") return res.status(403).json({ message: "Unauthorized" });

    const { date } = req.body;
    const existingBookings = await Booking.find({ date });
    if (existingBookings.length >= 10)
      return res.status(400).json({ message: "No slots available for this day" });

    const booking = new Booking({ userId: req.user.id, date, status: "Pending" });
    await booking.save();

    res.status(201).json({ message: "Booking request sent" });
  } catch (err) {
    res.status(500).json({ message: "Error requesting booking" });
  }
});

// Admin approves/rejects request
router.post("/manage", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Unauthorized" });

    const { bookingId, status, timeSlot } = req.body;
    if (!["Accepted", "Rejected"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    await Booking.findByIdAndUpdate(bookingId, { status, timeSlot });
    res.json({ message: `Booking ${status}` });
  } catch (err) {
    res.status(500).json({ message: "Error managing booking" });
  }
});

// User views their bookings
router.get("/my-bookings", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "user") return res.status(403).json({ message: "Unauthorized" });
    const bookings = await Booking.find({ userId: req.user.id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// Admin updates soil test data
router.post("/update-soil-data", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Unauthorized" });

    const { bookingId, wavelengths } = req.body;
    if (!Array.isArray(wavelengths) || wavelengths.length !== 18) {
      return res.status(400).json({ message: "Invalid wavelength data" });
    }

    await Booking.findByIdAndUpdate(bookingId, { wavelengths });
    res.json({ message: "Soil test data updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating soil data" });
  }
});

export default router;
