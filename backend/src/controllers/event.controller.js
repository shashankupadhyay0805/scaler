import { db } from "../config/db.js";
import { v4 as uuid } from "uuid";

export async function createEvent(req, res) {
  try {
    const { title, description, duration, slug } = req.body;

    if (!title || !duration || !slug) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const id = uuid();

    await db.query(
      "INSERT INTO event_types (id, title, description, duration, slug) VALUES (?, ?, ?, ?, ?)",
      [id, title, description, duration, slug]
    );

    res.status(201).json({ message: "Event created", id });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Slug already exists" });
    }
    res.status(500).json({ message: err.message });
  }
}

export async function getEvents(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM event_types");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    const { title, description, duration } = req.body;

    await db.query(
      "UPDATE event_types SET title=?, description=?, duration=? WHERE id=?",
      [title, description, duration, id]
    );

    res.json({ message: "Event updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteEvent(req, res) {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM event_types WHERE id=?", [id]);

    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
