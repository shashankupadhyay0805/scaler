import { db } from "../config/db.js";
import { v4 as uuid } from "uuid";

export async function createBooking(req, res) {
  try {
    const { eventTypeId, name, email, date, startTime, endTime } = req.body;

    if (!eventTypeId || !name || !email || !date || !startTime || !endTime) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const id = uuid();

    await db.query(
      "INSERT INTO bookings (id, event_type_id, name, email, date, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, eventTypeId, name, email, date, startTime, endTime]
    );

    res.status(201).json({ message: "Booking confirmed", id });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Slot already booked" });
    }
    res.status(500).json({ message: err.message });
  }
}

export async function getBookings(req, res) {
  try {
    const [rows] = await db.query(
      "SELECT * FROM bookings ORDER BY date DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function cancelBooking(req, res) {
  try {
    const { id } = req.params;

    await db.query(
      "UPDATE bookings SET status='CANCELLED' WHERE id=?",
      [id]
    );

    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
