import { Order, OrderValidationSchema } from "../models/order";
import { Request, Response } from "express";

/// Create order
export const createOrder = async (req: Request, res: Response) => {
  const { error } = OrderValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const order = await Order.create(req.body);
    return res.status(200).json({ order });
  } catch (err) {
    return res.status(500).json({ error: `Internal server error: ${err}` });
  }
};

/// Get all orders
export const getAllOrder = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({ where: { isDeleted: 0 } });
    return res.status(200).json({ orders });
  } catch (err) {
    return res.status(500).json({ Error: `Internal server error: ${err}` });
  }
};

/// Update ordr
export const updateOrder = async (req: Request, res: Response) => {
  const { error } = OrderValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ Error: error.details[0].message });

  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(400).json({ Error: "No order found" });

    const orderUpdated = await order.update(req.body);
    return res.status(200).json({ orderUpdated });
  } catch (err) {
    return res.status(500).json({ Error: `Internal server error: ${err}` });
  }
};

/// Delete order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(400).json({ Error: "No order found" });

    await order.update({ isDeleted: true });
    return res.status(200).json({ message: "Order deleted successfully." });
  } catch (err) {
    return res.status(500).json({ Error: `Internal server error: ${err}` });
  }
};
