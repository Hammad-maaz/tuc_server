import {
  createSchool,
  getAllSchools,
  updateSchool,
  deleteSchool,
} from "../controllers/school";
import { Router } from "express";
import { upload } from "../functions/file_upload";

const router = Router();

router.post("/", upload.single("logo"), createSchool);
router.get("/", getAllSchools);
router.put("/:id", upload.single("logo"), updateSchool);
router.delete("/:id", deleteSchool);

export default router;
