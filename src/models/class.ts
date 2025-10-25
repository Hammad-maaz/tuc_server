import { DataTypes, Model, Optional } from "sequelize";
import Joi from "joi";
import sequelize from "../middlewears/sequelize";

export interface IClass {
  id: number;
  schoolId: number;
  name: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IClassCreationAttributes extends Optional<IClass, "id"> {}

class ClassModel
  extends Model<IClass, IClassCreationAttributes>
  implements IClass
{
  public id!: number;
  public schoolId!: number;
  public name!: string;
  public isDeleted!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ClassModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "schools", key: "id" },
    },
    name: { type: DataTypes.STRING, allowNull: false },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
  { sequelize, tableName: "classes" }
);

const classValidationSchema = Joi.object({
  schoolId: Joi.number().integer().required(),
  name: Joi.string().min(1).max(255).required(),
});

export { ClassModel, classValidationSchema };
