import { ClassModel, classValidationSchema } from "../models/class";
import { Request, Response } from "express";

/// Create new class
export const createClass = async (req: Request, res: Response) => {
  const { error } = classValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const newClass = await ClassModel.create({
      schoolId: req.body.schoolId,
      name: req.body.name,
      isDeleted: false,
    });
    return res.status(200).json(newClass);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/// Get all classes
export const getAllClasses = async (req: Request, res: Response) => {
  try {
    const classes = await ClassModel.findAll({ where: { isDeleted: 0 } });
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/// Delete a class by ID
export const deleteClass = async (req: Request, res: Response) => {
  const classId = req.params.id;
  try {
    const specificClass = await ClassModel.findByPk(classId);
    if (!specificClass)
      return res.status(404).json({ error: "Class not found" });

    await specificClass?.update({ isDeleted: true });
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
