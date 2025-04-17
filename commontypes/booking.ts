export interface Booking{
    customerName: string;
    customerEmail: string;
    bookingDate: any;
    bookingTime: string;
    numberOfGuests: number;
    pickupLocation: string;
    dropoffLocation: string;
    specialRequests?: string;
    status: "confirmed" | "pending" | "cancelled";
    qrCodeUrl?: string;
}