import { DataTypes, Model, Optional } from "sequelize";
import Joi from "joi";
import sequelize from "../middlewears/sequelize";

export interface ISession {
  id: number;
  classId: number;
  name: string;
  maleUpperWear: string;
  maleLowerWear: string;
  femaleUpperWear: string;
  femaleLowerWear: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ISessionAttributes
  extends Optional<ISession, "id" | "isDeleted" | "createdAt" | "updatedAt"> {}

class SessionModel
  extends Model<ISession, ISessionAttributes>
  implements ISession
{
  id!: number;
  classId!: number;
  name!: string;
  maleUpperWear!: string;
  maleLowerWear!: string;
  femaleUpperWear!: string;
  femaleLowerWear!: string;
  isDeleted!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SessionModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "classes", key: "id" },
    },
    name: { type: DataTypes.STRING, allowNull: false },
    maleUpperWear: { type: DataTypes.STRING, allowNull: false },
    maleLowerWear: { type: DataTypes.STRING, allowNull: false },
    femaleUpperWear: { type: DataTypes.STRING, allowNull: false },
    femaleLowerWear: { type: DataTypes.STRING, allowNull: false },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "sessions",
  }
);

const sessionValidationSchema = Joi.object({
  classId: Joi.number().integer().required(),
  name: Joi.string().min(1).max(255).required(),
  maleUpperWear: Joi.string().uri().required(),
  maleLowerWear: Joi.string().uri().required(),
  femaleUpperWear: Joi.string().uri().required(),
  femaleLowerWear: Joi.string().uri().required(),
  isDeleted: Joi.boolean().optional(),
});

const updateSessionValidationSchema = Joi.object({
  classId: Joi.number().integer().optional(),
  name: Joi.string().min(1).max(255).optional(),
  maleUpperWear: Joi.string().uri().optional(),
  maleLowerWear: Joi.string().uri().optional(),
  femaleUpperWear: Joi.string().uri().optional(),
  femaleLowerWear: Joi.string().uri().optional(),
  isDeleted: Joi.boolean().optional(),
});

export { SessionModel, sessionValidationSchema, updateSessionValidationSchema };
