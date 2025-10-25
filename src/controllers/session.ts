import {
  SessionModel,
  sessionValidationSchema,
  updateSessionValidationSchema,
} from "../models/session";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

/// Create new session
export const createSession = async (req: Request, res: Response) => {
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  if (
    !files?.maleUpperWear?.[0] ||
    !files?.maleLowerWear?.[0] ||
    !files?.femaleUpperWear?.[0] ||
    !files?.femaleLowerWear?.[0]
  ) {
    return res.status(400).json({ error: "All images are required" });
  }

  const baseUrl = `${req.protocol}://${req.get("host")}/uploads`;
  const body = {
    maleUpperWear: `${baseUrl}/${files.maleUpperWear[0].filename}`,
    maleLowerWear: `${baseUrl}/${files.maleLowerWear[0].filename}`,
    femaleUpperWear: `${baseUrl}/${files.femaleUpperWear[0].filename}`,
    femaleLowerWear: `${baseUrl}/${files.femaleLowerWear[0].filename}`,
    isDeleted: false,
    ...req.body,
  };

  const { error } = sessionValidationSchema.validate(body);
  if (error) {
    Object.values(files).forEach((fileArray) =>
      fileArray.forEach((file) => {
        try {
          fs.unlinkSync(path.join("uploads", file.filename));
        } catch (unlinkErr) {
          console.error(`Failed to delete file ${file.filename}:`, unlinkErr);
        }
      })
    );
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const session = await SessionModel.create(body);
    res.status(200).json(session);
  } catch (err) {
    Object.values(files).forEach((fileArray) =>
      fileArray.forEach((file) => {
        try {
          fs.unlinkSync(path.join("uploads", file.filename));
        } catch (unlinkErr) {
          console.error(`Failed to delete file ${file.filename}:`, unlinkErr);
        }
      })
    );
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/// Get all sessions
export const getAllSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await SessionModel.findAll({ where: { isDeleted: 0 } });
    return res.status(200).json(sessions);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSession = async (req: Request, res: Response) => {
  console.log("REACHED");

  const files = req.files as
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined;

  try {
    const session = await SessionModel.findByPk(req.params.id);
    if (!session) return res.status(404).json({ error: "Session not found." });

    const baseUrl = `${req.protocol}://${req.get("host")}/uploads`;

    const imageFields: string[] = [
      "maleUpperWear",
      "maleLowerWear",
      "femaleUpperWear",
      "femaleLowerWear",
    ];

    imageFields.forEach((field) => {
      const uploadedFile = files?.[field]?.[0];
      if (uploadedFile) {
        const oldUrl = session[field as keyof typeof session] as string | null;
        if (oldUrl) {
          const oldFilename = path.basename(oldUrl);
          const oldPath = path.join("uploads", oldFilename);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        req.body[field] = `${baseUrl}/${uploadedFile.filename}`;
      }
    });

    const { error } = updateSessionValidationSchema.validate(req.body, {
      allowUnknown: true,
    });
    if (error) return res.status(400).json({ error: error.details[0].message });

    await session.update(req.body);

    res
      .status(200)
      .json({ message: "Session updated successfully.", data: session });
  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: "Internal server error" });
  }
};

/// Delete session
export const deleteSession = async (req: Request, res: Response) => {
  try {
    // Find the session by ID
    const session = await SessionModel.findByPk(req.params.id);
    if (!session) return res.status(404).json({ error: "Session not found." });

    // Soft delete the session
    await session.update({ isDeleted: true });

    // Send success response
    res.status(200).json({ message: "Session deleted successfully." });
  } catch (ex) {
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};
