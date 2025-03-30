import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
    timeSlot: { type: String },
    wavelengths: {
      type: [Number],
      validate: {
        validator: function (arr) {
          return arr.length === 18;
        },
        message: "Exactly 18 wavelength values are required",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
