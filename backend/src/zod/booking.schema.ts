import { z } from "zod";

export const bookingSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerEmail: z.string().email("Invalid email address"),
  bookingDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid booking date",
  }),
  bookingTime: z.string().min(1, "Booking time is required"),
  numberOfGuests: z.number().int().positive("Guests must be a positive number"),
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropoffLocation: z.string().min(1, "Dropoff location is required"),
  specialRequests: z.string().optional(),
  status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
});
