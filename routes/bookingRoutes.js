import express from "express";
import {
  syncBookings,
  getAllBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

// GET /api/bookings/sync - to pull dummy/external data
router.get("/sync", syncBookings);

// GET /api/bookings - to list all local bookings
router.get("/", getAllBookings);

// PATCH /api/bookings/:id/status - to update booking status
router.patch("/:id/status", updateBookingStatus);

export default router;
