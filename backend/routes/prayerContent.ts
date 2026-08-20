import {
  Router,
} from "express";
import {
  getPrayerContent,
  getAdminPrayerContent,
  updatePrayerSpace,
  updateJumuahService,
} from "../controllers/prayerContentController";
import {
  checkAuth,
} from "../middleware/checkAuth";

const router =
  Router();

router.get(
  "/",
  getPrayerContent,
);

router.get(
  "/admin/all",
  checkAuth,
  getAdminPrayerContent,
);

router.put(
  "/spaces/:id",
  checkAuth,
  updatePrayerSpace,
);

router.put(
  "/jumuah/:id",
  checkAuth,
  updateJumuahService,
);

export default router;
