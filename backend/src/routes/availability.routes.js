import express from "express";
import {
  createAvailability,
  getAvailability,
  deleteAvailability
} from "../controllers/availability.controller.js";

const router = express.Router();

router.post("/", createAvailability);
router.get("/:eventTypeId", getAvailability);
router.delete("/:id", deleteAvailability);

export default router;
