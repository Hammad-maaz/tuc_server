import { DataTypes, Model, Optional } from "sequelize";
import Joi from "joi";
import sequelize from "../middlewears/sequelize";

export interface ISchool {
  id: number;
  logo: string;
  name: string;
  address: string;
  principalName: string;
  principalContact: string;
  receptionistName: string;
  receptionistContact: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ISchoolCreationAttributes
  extends Optional<
    ISchool,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "principalName"
    | "principalContact"
    | "receptionistName"
    | "receptionistContact"
  > {}

class SchoolModel
  extends Model<ISchool, ISchoolCreationAttributes>
  implements ISchool
{
  public id!: number;
  public logo!: string;
  public name!: string;
  public address!: string;
  public principalName!: string;
  public principalContact!: string;
  public receptionistName!: string;
  public receptionistContact!: string;
  public isDeleted!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SchoolModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    logo: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    principalName: { type: DataTypes.STRING, allowNull: true },
    principalContact: { type: DataTypes.STRING, allowNull: true },
    receptionistName: { type: DataTypes.STRING, allowNull: true },
    receptionistContact: { type: DataTypes.STRING, allowNull: true },
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
  {
    sequelize,
    tableName: "schools",
  }
);

const schoolValidationSchema = Joi.object({
  logo: Joi.string().uri().required(),
  name: Joi.string().min(3).max(100).required(),
  address: Joi.string().min(10).max(255).required(),
  principalName: Joi.string().min(3).max(100).optional(),
  principalContact: Joi.string().min(7).max(15).optional(),
  receptionistName: Joi.string().min(3).max(100).optional(),
  receptionistContact: Joi.string().min(7).max(15).optional(),
  isDeleted: Joi.boolean().optional(),
});

export { SchoolModel, schoolValidationSchema };
