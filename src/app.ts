import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import multer from "multer";
import userRoutes from "./routes/user";
import sizeDefinationRoutes from "./routes/size_defination";

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
