import express from "express";
import {
  createBooking,
  getBookings,
  cancelBooking
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBookings);
router.patch("/:id/cancel", cancelBooking);

export default router;
