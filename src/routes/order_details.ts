import {
  createOrderDetails,
  getAllOrderDetails,
  updateOrderDetails,
} from "../controllers/order_details";
import { Router } from "express";
const router = Router();

router.post("/", createOrderDetails);
router.get("/", getAllOrderDetails);
router.put("/:id", updateOrderDetails);

export default router;
