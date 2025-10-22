import { Request, Response } from "express";
import {
  SizeDefinationModel,
  sizeDefinationSchema,
} from "../models/size_defination";
import _ from "lodash";

/// Create a new size definition
const createSizeDefination = async (req: Request, res: Response) => {
  // 1. Validate the request body
  const { error } = sizeDefinationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    // 2. Check if a size with this number already exists
    let sizeDef = await SizeDefinationModel.findOne({
      where: { sizeNumber: req.body.sizeNumber },
    });
    if (sizeDef)
      return res.status(400).json({ error: "Size number already exists." });

    // 3. Create and save the new size definition
    sizeDef = new SizeDefinationModel(req.body);
    await sizeDef.save();

    // 4. Send success response
    res.status(200).json({
      message: "Size definition created successfully.",
      data: sizeDef,
    });
  } catch (ex) {
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

/// Get all size definitions
const getAllSizeDefinations = async (req: Request, res: Response) => {
  try {
    const sizeDefinitions = await SizeDefinationModel.findAll();
    res.status(200).json(sizeDefinitions);
  } catch (ex) {
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

/// Get a single size definition by ID
const getSizeDefinationById = async (req: Request, res: Response) => {
  try {
    const sizeDefinition = await SizeDefinationModel.findByPk(req.params.id);

    if (!sizeDefinition)
      return res.status(404).json({ error: "Size definition not found." });

    res.status(200).json(sizeDefinition);
  } catch (ex) {
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

export { createSizeDefination, getAllSizeDefinations, getSizeDefinationById };
