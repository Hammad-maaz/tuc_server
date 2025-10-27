import {
  createOrder,
  deleteOrder,
  getAllOrder,
  updateOrder,
} from "../controllers/order";
import { Router } from "express";
const router = Router();

router.post("/", createOrder);
router.get("/", getAllOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
