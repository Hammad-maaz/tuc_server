import { createClass, getAllClasses, deleteClass } from "../controllers/class";
import { Router } from "express";
const router = Router();

router.post("/", createClass);
router.get("/", getAllClasses);
router.delete("/:id", deleteClass);

export default router;
