import {
  createSession,
  getAllSessions,
  updateSession,
  deleteSession,
} from "../controllers/session";
import { Router } from "express";
import { upload } from "../functions/file_upload";
const router = Router();

router.post(
  "/",
  upload.fields([
    { name: "maleUpperWear", maxCount: 1 },
    { name: "maleLowerWear", maxCount: 1 },
    { name: "femaleUpperWear", maxCount: 1 },
    { name: "femaleLowerWear", maxCount: 1 },
  ]),
  createSession
);
router.get("/", getAllSessions);
router.put(
  "/:id",
  upload.fields([
    { name: "maleUpperWear", maxCount: 1 },
    { name: "maleLowerWear", maxCount: 1 },
    { name: "femaleUpperWear", maxCount: 1 },
    { name: "femaleLowerWear", maxCount: 1 },
  ]),
  updateSession
);
router.delete("/:id", deleteSession);

export default router;
