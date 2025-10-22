import express from "express";
import {
  createSizeDefination,
  getAllSizeDefinations,
  getSizeDefinationById,
} from "../controllers/size_definaton";
const router = express.Router();

router.post("/createSizeDefination", createSizeDefination);
router.get("/getAllSizeDefinations", getAllSizeDefinations);
router.get("/getSizeDefinationById/:id", getSizeDefinationById);

export default router;
