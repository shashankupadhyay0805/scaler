import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";
import publicRoutes from "./routes/public.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/events", eventRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/bookings", bookingRoutes);

export default app;
