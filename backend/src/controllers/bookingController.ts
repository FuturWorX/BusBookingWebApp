import { Request, Response } from "express";
import firebase from "../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  getDocs,
} from "firebase/firestore";
import { Booking } from "../../commontypes/booking";
import { bookingSchema } from "../zod/booking.schema";
import QRCode from "qrcode";

const db = getFirestore(firebase);

// Create a new booking with a unique QR code
export const createBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = bookingSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const {
      customerName,
      customerEmail,
      bookingDate,
      bookingTime,
      numberOfGuests,
      pickupLocation,
      dropoffLocation,
      specialRequests,
      status,
    } = parsed.data;

    const newBookingData: Omit<Booking, "qrCodeUrl"> = {
      customerName,
      customerEmail,
      bookingDate: Timestamp.fromDate(new Date(bookingDate)),
      bookingTime,
      numberOfGuests,
      pickupLocation,
      dropoffLocation,
      specialRequests: specialRequests || "",
      status: status || "pending",
    };

    const bookingRef = collection(db, "bookings");
    const docRef = await addDoc(bookingRef, newBookingData);
    const bookingId = docRef.id;

    const qrCodeData = `BOOKING_ID:${bookingId}`;

    QRCode.toDataURL(qrCodeData, async (err, url) => {
      if (err) {
        console.error("Error generating QR code:", err);
        res.status(500).json({
          error: "Failed to generate QR code, booking created without it",
          bookingId: bookingId,
        });
        return;
      }

      await updateDoc(doc(db, "bookings", bookingId), {
        qrCodeUrl: url,
      });

      res.status(201).json({
        success: true,
        message: "Booking created successfully with a QR code",
        bookingId: bookingId,
        qrCodeUrl: url,
      });
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

export const getBookings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookingsRef = collection(db, "bookings");
    const snapshot = await getDocs(bookingsRef);
    const bookings: Booking[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        bookingDate: data.bookingDate,
        bookingTime: data.bookingTime,
        numberOfGuests: data.numberOfGuests,
        pickupLocation: data.pickupLocation,
        dropoffLocation: data.dropoffLocation,
        specialRequests: data.specialRequests || "",
        status: data.status || "pending",
      } as Booking;
    });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

// Read a specific booking by ID
export const getBookingById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { bookingId } = req.params;

  try {
    const bookingRef = doc(db, "bookings", bookingId);
    const docSnap = await getDoc(bookingRef);

    if (docSnap.exists()) {
      res.status(200).json({
        success: true,
        booking: { id: docSnap.id, ...docSnap.data() },
      });
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    console.error("Error fetching booking: ", error);
    res.status(500).json({ error: "Failed to fetch booking" });
  }
};

// Update a booking by ID
export const updateBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { bookingId } = req.params;

  try {
    const parsed = bookingSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const {
      customerName,
      customerEmail,
      bookingDate,
      bookingTime,
      numberOfGuests,
      pickupLocation,
      dropoffLocation,
      specialRequests,
      status,
    } = parsed.data;

    const updatedBooking: Booking = {
      customerName,
      customerEmail,
      bookingDate: Timestamp.fromDate(new Date(bookingDate)),
      bookingTime,
      numberOfGuests,
      pickupLocation,
      dropoffLocation,
      specialRequests: specialRequests || "",
      status: status || "pending",
    };

    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, JSON.parse(JSON.stringify(updatedBooking)));

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
    });
  } catch (error) {
    console.error("Error updating booking: ", error);
    res.status(500).json({ error: "Failed to update booking" });
  }
};

// Delete a booking by ID
export const deleteBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { bookingId } = req.params;

  try {
    const bookingRef = doc(db, "bookings", bookingId);
    await deleteDoc(bookingRef);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting booking: ", error);
    res.status(500).json({ error: "Failed to delete booking" });
  }
};



