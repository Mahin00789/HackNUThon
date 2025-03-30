import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  registerUser
);

router.route("/login").post(loginUser);


router.route("/logout").post(verifyJWT, logoutUser);
router.post("/bookings", async (req, res) => {
  try {
    const { userId, pincode } = req.body;
    const newBooking = new Booking({
      user: userId,
      pincode,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking request submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/user/bookings/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
