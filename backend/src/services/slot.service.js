import { db } from "../config/db.js";

function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export async function getAvailableSlots(slug, date) {
  const [events] = await db.query(
    "SELECT * FROM event_types WHERE slug=?",
    [slug]
  );

  if (!events.length) return [];

  const event = events[0];
  const duration = event.duration;

  const day = new Date(date).getDay();

  const [availability] = await db.query(
    "SELECT * FROM availability WHERE event_type_id=? AND day_of_week=?",
    [event.id, day]
  );

  if (!availability.length) return [];

  const [bookings] = await db.query(
    "SELECT * FROM bookings WHERE event_type_id=? AND date=? AND status='CONFIRMED'",
    [event.id, date]
  );

  const bookedSlots = bookings.map(b => b.start_time);

  const slots = [];

  for (const a of availability) {
    let start = timeToMinutes(a.start_time);
    const end = timeToMinutes(a.end_time);

    while (start + duration <= end) {
      const slot = minutesToTime(start);
      if (!bookedSlots.includes(slot)) {
        slots.push(slot);
      }
      start += duration;
    }
  }

  return slots;
}
