import express from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController";

const router = express.Router();


router.post("/booking", createBooking); 
router.get("/bookings", getBookings);
router.get("/test", getBookings);
router.get("/booking/:bookingId", getBookingById);
router.put("/booking/:bookingId", updateBooking); 
router.delete("/booking/:bookingId", deleteBooking); 

export default router;
