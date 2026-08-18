import { Router } from "express";
import {
  getEvents,
  getAdminEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventsController";
import { checkAuth } from "../middleware/checkAuth";
import { upload } from "../middleware/upload";

const router = Router();

router.get("/", getEvents);
router.get(
  "/admin/all",
  checkAuth,
  getAdminEvents,
);
router.get("/:id", getEventById);
router.post("/", checkAuth, upload.single("image"), createEvent);
router.put("/:id", checkAuth, upload.single("image"), updateEvent);
router.delete("/:id", checkAuth, deleteEvent);

export default router;
