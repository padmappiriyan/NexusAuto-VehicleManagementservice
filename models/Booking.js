import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true }, // Django ID
  customerName: String,
  serviceName: String,
  center: String,
  date: String,
  startTime: String,
  endTime: String,
  currentStatus: {
    type: String,
    enum: ["Pending", "In-progress", "Hold-on", "Completed", "Rejected"],
    default: "booked",
  },
  synced: { type: Boolean, default: false }, // used for sync status
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicles", // Reference to Vehicle collection
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

