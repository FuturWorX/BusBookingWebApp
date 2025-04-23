import express from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController";

import {
  createBusRoute,
  getAllBusRoutes,
  getBusRouteById,
  updateBusRoute,
  deleteBusRoute,
} from "../controllers/busRoutesController"; 



const router = express.Router();

// booking routes
router.post("/booking", createBooking);
router.get("/bookings", getBookings);
router.get("/test", getBookings);
router.get("/booking/:bookingId", getBookingById);
router.put("/booking/:bookingId", updateBooking);
router.delete("/booking/:bookingId", deleteBooking);

// bus route routes
router.post("/busroutes", createBusRoute);
router.get("/busroutes", getAllBusRoutes);
router.get("/busroutes/:id", getBusRouteById);
router.put("/busroutes/:id", updateBusRoute);
router.delete("/busroutes/:id", deleteBusRoute);

export default router;
