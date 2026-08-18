import {
  Router,
} from "express";
import {
  createProgram,
  deleteProgram,
  getProgramBySlug,
  getPrograms,
  getAdminPrograms,
  updateProgram,
} from "../controllers/programsController";
import {
  checkAuth,
} from "../middleware/checkAuth";

const router =
  Router();

router.get(
  "/",
  getPrograms,
);

router.get(
  "/admin/all",
  checkAuth,
  getAdminPrograms,
);

router.get(
  "/slug/:slug",
  getProgramBySlug,
);

router.post(
  "/",
  checkAuth,
  createProgram,
);

router.put(
  "/:id",
  checkAuth,
  updateProgram,
);

router.delete(
  "/:id",
  checkAuth,
  deleteProgram,
);

export default router;
