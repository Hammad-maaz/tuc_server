import {
  OrderDetails,
  OrderDetailsValidationSchema,
} from "../models/order_details";
import { Request, Response } from "express";

/// Create order details
export const createOrderDetails = async (req: Request, res: Response) => {
  const { error } = OrderDetailsValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const orderDetails = await OrderDetails.create(req.body);
    return res.status(200).json({ orderDetails });
  } catch (err) {
    return res.status(500).json({ error: `Internal server error: ${err}` });
  }
};

/// Get all order details
export const getAllOrderDetails = async (req: Request, res: Response) => {
  try {
    const orderDetails = await OrderDetails.findAll({
      include: [{ model: require("../models/order").Order, as: "order" }],
    });
    return res.status(200).json({ orderDetails });
  } catch (err) {
    return res.status(500).json({ error: `Internal server error: ${err}` });
  }
};

/// Update order details
export const updateOrderDetails = async (req: Request, res: Response) => {
  const { error } = OrderDetailsValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const orderDetails = await OrderDetails.findByPk(req.params.id);
    if (!orderDetails)
      return res.status(400).json({ error: "No order details found" });

    const orderDetailsUpdated = await orderDetails.update(req.body);
    return res.status(200).json({ orderDetailsUpdated });
  } catch (err) {
    return res.status(500).json({ error: `Internal server error: ${err}` });
  }
};
