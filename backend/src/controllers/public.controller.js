import { getAvailableSlots } from "../services/slot.service.js";
import { db } from "../config/db.js";

export async function getEventBySlug(req, res) {
  const { slug } = req.params;

  const [rows] = await db.query(
    "SELECT * FROM event_types WHERE slug=?",
    [slug]
  );

  if (!rows.length) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.json(rows[0]);
}

export async function getSlots(req, res) {
  const { slug } = req.params;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  const slots = await getAvailableSlots(slug, date);
  res.json(slots);
}
