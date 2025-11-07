import Booking from "../models/Booking.js";
// import axios from "axios"; // Uncomment later when Django API is live

// 1. Sync bookings (Dummy for now)
export const syncBookings = async (req, res) => {
  try {
    // Dummy data simulating Django response
    const dummyData = [
      {
        bookingId: "D001",
        customerName: "John Doe",
        serviceName: "Oil Change",
        center: "Colombo Main Center",
        date: "2025-11-08",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        currentStatus: "Pending",
        vehicle: "690d90e6c3167379244f267e",// <-- use "vehicle" field
      },
      {
        bookingId: "D002",
        customerName: "Emma Watson",
        serviceName: "Full Body Polish",
        center: "Kandy Center",
        date: "2025-11-09",
        startTime: "1:00 PM",
        endTime: "5:00 PM",
        currentStatus: "Pending",
        vehicle: "690d90fec3167379244f2680",
      },
       {
        bookingId: "D003",
        customerName: "Emma Watson",
        serviceName: "Full Body Polish",
        center: "Kandy Center",
        date: "2025-11-09",
        startTime: "1:00 PM",
        endTime: "5:00 PM",
        currentStatus: "Completed",
        vehicle: "690d90fec3167379244f2680",
      },
       {
        bookingId: "D007",
        customerName: "Emma Watson",
        serviceName: "Wheel Checking",
        center: "Kandy Center",
        date: "2025-11-09",
        startTime: "1:00 PM",
        endTime: "5:00 PM",
        currentStatus: "In Progress",
        vehicle: "690d90fec3167379244f2680",
      },
       {
        bookingId: "D002",
        customerName: "Emma Watson",
        serviceName: "Full Body Polish",
        center: "Kandy Center",
        date: "2025-11-09",
        startTime: "1:00 PM",
        endTime: "5:00 PM",
        currentStatus: "Completed",
        vehicle: "690d90fec3167379244f2680",
      },
    ];

    // Save or update dummy data in MongoDB
    for (const data of dummyData) {
      await Booking.findOneAndUpdate({ bookingId: data.bookingId }, data, {
        upsert: true,
      });
    }

    res.status(200).json({ message: "Bookings synced successfully!" });
  } catch (error) {
    console.error("Sync error:", error);
    res.status(500).json({ error: "Failed to sync bookings" });
  }
};

// 2. Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    // Populate only specific fields from Vehicle
    const bookings = await Booking.find()
      .populate("vehicle", "customerId vehicleType brand model year licensePlate color notes") // vehicle fields
      .select("bookingId customerName serviceName center date currentStatus vehicle"); // booking fields

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

// 3. Update booking status (Employee updates)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params; // bookingId
    const { newStatus } = req.body;

    const booking = await Booking.findOneAndUpdate(
      { bookingId: id },
      { currentStatus: newStatus, synced: false },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    //  Future: Update status in Django API also
    // await axios.patch(`http://django-service/bookings/${id}/`, { status: newStatus });

    res.status(200).json({
      message: " Booking status updated successfully",
      updatedBooking: booking,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update booking status" });
  }
};
