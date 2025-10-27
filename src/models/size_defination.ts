import { DataTypes, Model, Optional } from "sequelize";
import Joi from "joi";
import sequelize from "../middlewears/sequelize"; // Assuming this path is correct

// TypeScript interfaces for the nested objects
// Updated: bokramUsed, collarUsed, and buttonUsed are now optional
export interface IUpperWearDetails {
  collar: string;
  cuff: string;
  tera: string;
  bazo: string;
  armhole: string;
  chest: string;
  bokramUsed?: string;
  collarUsed?: string;
  buttonUsed?: string;
  fabricUsed: string;
}

// Updated: zipUsed, buttonUsed, and hookUsed are now optional
export interface ILowerWearDetails {
  losign: string;
  hip: string;
  waist: string;
  bottom: string;
  zipUsed?: string;
  buttonUsed?: string;
  hookUsed?: string;
  fabricUsed: string;
}

export interface IHeadCoverDetails {
  type: string;
  length: string;
  fabricUsed: string;
}

// Main interface for the SizeDefination model instance
export interface ISizeDefination {
  id: number;
  sizeNumber: string;
  gender: string;
  upperWear: IUpperWearDetails;
  lowerWear: ILowerWearDetails;
  headCover?: IHeadCoverDetails;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for model creation, making 'id', 'createdAt', and 'updatedAt' optional
interface ISizeDefinationCreationAttributes
  extends Optional<ISizeDefination, "id" | "createdAt" | "updatedAt"> {}

// Sequelize Model Class
class SizeDefinationModel
  extends Model<ISizeDefination, ISizeDefinationCreationAttributes>
  implements ISizeDefination
{
  public id!: number;
  public sizeNumber!: string;
  public gender!: string;
  public upperWear!: IUpperWearDetails;
  public lowerWear!: ILowerWearDetails;
  public headCover?: IHeadCoverDetails;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
SizeDefinationModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sizeNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upperWear: {
      type: DataTypes.JSON, // Storing object as JSON in the database
      allowNull: false,
    },
    lowerWear: {
      type: DataTypes.JSON, // Storing object as JSON in the database
      allowNull: false,
    },
    headCover: {
      type: DataTypes.JSON, // Storing object as JSON in the database
      allowNull: true, // This field is optional
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "size_defination",
    sequelize,
  }
);

// Joi validation schema for incoming API requests
const sizeDefinationSchema = Joi.object({
  sizeNumber: Joi.string().required(),
  gender: Joi.string().required(),
  upperWear: Joi.object({
    collar: Joi.string().required(),
    cuff: Joi.string().required(),
    tera: Joi.string().required(),
    bazo: Joi.string().required(),
    armhole: Joi.string().required(),
    chest: Joi.string().required(),
    bokramUsed: Joi.string().optional(), // Changed to optional
    collarUsed: Joi.string().optional(), // Changed to optional
    buttonUsed: Joi.string().optional(), // Changed to optional
    fabricUsed: Joi.string().required(),
  }).required(),
  lowerWear: Joi.object({
    losign: Joi.string().required(),
    hip: Joi.string().required(),
    waist: Joi.string().required(),
    bottom: Joi.string().required(),
    zipUsed: Joi.string().optional(), // Changed to optional
    buttonUsed: Joi.string().optional(), // Changed to optional
    hookUsed: Joi.string().optional(), // Changed to optional
    fabricUsed: Joi.string().required(),
  }).required(),
  headCover: Joi.object({
    type: Joi.string().required(),
    length: Joi.string().required(),
    fabricUsed: Joi.string().required(),
  }).optional(),
});

export { SizeDefinationModel, sizeDefinationSchema };
