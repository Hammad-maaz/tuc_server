import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import multer from "multer";
import userRoutes from "./routes/user";
import sizeDefinationRoutes from "./routes/size_defination";
import schoolRoutes from "./routes/school";
import classRoutes from "./routes/class";
import sessionRoutes from "./routes/session";
import orderRoutes from "./routes/order";
import orderDetailsRoutes from "./routes/order_details";

const app = express();
const upload = multer();

app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/// USERS
app.use("/api/users", upload.any(), userRoutes);

/// SIZE DEFINITIONS
app.use("/api/sizeDefinations", upload.any(), sizeDefinationRoutes);

/// SCHOOLS
app.use("/api/schools", schoolRoutes);

/// CLASSES
app.use("/api/classes", upload.any(), classRoutes);

/// SESSIONS
app.use("/api/sessions", sessionRoutes);

/// ORDERS
app.use("/api/orders", upload.any(), orderRoutes);

/// ORDER DETAILS
app.use("/api/orderDetails", upload.any(), orderDetailsRoutes);

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

/// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  let error: CustomError = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

export default app;

interface CustomError extends Error {
  status?: number;
}
