import express from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
} from "../controllers/event.controller.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
