import { SchoolModel, schoolValidationSchema } from "../models/school";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

/// Create new school
export const createSchool = async (req: Request, res: Response) => {
  // Handle file upload
  if (!req.file) {
    return res.status(400).json({ error: "Logo file is required." });
  }
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  req.body.logo = fileUrl;

  // Validate the request body (without logo for now)
  const { error } = schoolValidationSchema.validate(req.body);
  if (error) {
    const filePath = path.join("uploads", req.file.filename);
    fs.unlinkSync(filePath);
    res.status(400).json({ error: error.details[0].message });
  }

  // Create and save the new school
  try {
    const newSchool = await SchoolModel.create(req.body);
    res
      .status(200)
      .json({ message: "School created successfully.", data: newSchool });
  } catch (ex) {
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

/// Get all schools
export const getAllSchools = async (req: Request, res: Response) => {
  try {
    const schools = await SchoolModel.findAll({ where: { isDeleted: 0 } });
    res.status(200).json(schools);
  } catch (ex) {
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

/// Update existing school
export const updateSchool = async (req: Request, res: Response) => {
  try {
    // Find the school by ID
    const school = await SchoolModel.findByPk(req.params.id);
    if (!school) return res.status(404).json({ error: "School not found." });

    // Handle file upload if provided
    if (req.file) {
      // Delete old file if exists
      const oldFilename = path.basename(school.logo);
      const oldPath = path.join("uploads", oldFilename);
      fs.unlinkSync(oldPath);

      // Update logo URL
      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      req.body.logo = fileUrl;
    }

    // Validate the request body
    const { error } = schoolValidationSchema.validate(req.body);
    if (error) {
      const filePath = path.join("uploads", school.logo);
      fs.unlinkSync(filePath);
      res.status(400).json({ error: error.details[0].message });
    }

    // Update the school details
    await school.update(req.body);

    // Send success response
    res
      .status(200)
      .json({ message: "School updated successfully.", data: school });
  } catch (ex) {
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

/// Delete a school
export const deleteSchool = async (req: Request, res: Response) => {
  try {
    // Find the school by ID
    const school = await SchoolModel.findByPk(req.params.id);
    if (!school) return res.status(404).json({ error: "School not found." });

    // Soft delete the school
    await school.update({ isDeleted: true });

    // Send success response
    res.status(200).json({ message: "School deleted successfully." });
  } catch (ex) {
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};
