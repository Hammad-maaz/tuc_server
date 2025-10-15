import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import userRoutes from "./routes/user";
import multer from "multer";

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

app.use("/api/users", upload.any(), userRoutes);
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
