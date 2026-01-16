import express from "express";
import {
  getEventBySlug,
  getSlots
} from "../controllers/public.controller.js";

const router = express.Router();

router.get("/:slug", getEventBySlug);
router.get("/:slug/slots", getSlots);

export default router;
