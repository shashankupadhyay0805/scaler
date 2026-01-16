import { db } from "../config/db.js";
import { v4 as uuid } from "uuid";

export async function createAvailability(req, res) {
  try {
    const { eventTypeId, dayOfWeek, startTime, endTime, timezone } = req.body;

    if (!eventTypeId || dayOfWeek === undefined || !startTime || !endTime || !timezone) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const id = uuid();

    await db.query(
      "INSERT INTO availability (id, event_type_id, day_of_week, start_time, end_time, timezone) VALUES (?, ?, ?, ?, ?, ?)",
      [id, eventTypeId, dayOfWeek, startTime, endTime, timezone]
    );

    res.status(201).json({ message: "Availability added", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getAvailability(req, res) {
  try {
    const { eventTypeId } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM availability WHERE event_type_id=?",
      [eventTypeId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteAvailability(req, res) {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM availability WHERE id=?", [id]);

    res.json({ message: "Availability deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
