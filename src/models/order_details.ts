import { DataTypes, Model, Optional } from "sequelize";
import Joi from "joi";
import sequelize from "../middlewears/sequelize";
import { Order } from "./order";

// Interfaces for the details, based on size_defination
export interface IUpperWearDetails {
  collar: string;
  cuff: string;
  tera: string;
  bazo: string;
  armhole: string;
  chest: string;
  boramUsed?: string;
  collarUsed?: string;
  buttonUsed?: string;
  fabricUsed: string;
}

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

export interface IOrderDetails {
  id: number;
  orderId: number;
  studentName: string;
  sizeNumber: string;
  gender: "male" | "female";
  orderOf: "upperWear" | "lowerWear" | "both";
  upperWear?: IUpperWearDetails;
  lowerWear?: ILowerWearDetails;
  headCover?: IHeadCoverDetails;
  createdAt: Date;
  updatedAt: Date;
}

interface IOrderDetailsAttributes
  extends Optional<IOrderDetails, "id" | "createdAt" | "updatedAt"> {}

class OrderDetails
  extends Model<IOrderDetails, IOrderDetailsAttributes>
  implements IOrderDetails
{
  public id!: number;
  public orderId!: number;
  public studentName!: string;
  public sizeNumber!: string;
  public gender!: "male" | "female";
  public orderOf!: "upperWear" | "lowerWear" | "both";
  public upperWear?: IUpperWearDetails;
  public lowerWear?: ILowerWearDetails;
  public headCover?: IHeadCoverDetails;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderDetails.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderId: {
      type: DataTypes.INTEGER,
      references: { model: "orders", key: "id" },
      allowNull: false,
    },
    studentName: { type: DataTypes.STRING, allowNull: false },
    sizeNumber: { type: DataTypes.STRING, allowNull: false },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: false,
    },
    orderOf: {
      type: DataTypes.ENUM("upperWear", "lowerWear", "both"),
      allowNull: false,
    },
    upperWear: { type: DataTypes.JSON, allowNull: true },
    lowerWear: { type: DataTypes.JSON, allowNull: true },
    headCover: { type: DataTypes.JSON, allowNull: true },
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
    tableName: "order_details",
  }
);

// Associations
OrderDetails.belongsTo(Order, { foreignKey: "orderId", as: "order" });

const OrderDetailsValidationSchema = Joi.object({
  orderId: Joi.number().integer().min(1).required(),
  studentName: Joi.string().min(1).max(255).required(),
  sizeNumber: Joi.string().min(1).max(255).required(),
  gender: Joi.string().valid("male", "female").required(),
  orderOf: Joi.string().valid("upperWear", "lowerWear", "both").required(),
  upperWear: Joi.when("orderOf", {
    is: Joi.valid("upperWear", "both"),
    then: Joi.object({
      collar: Joi.string().required(),
      cuff: Joi.string().required(),
      tera: Joi.string().required(),
      bazo: Joi.string().required(),
      armhole: Joi.string().required(),
      chest: Joi.string().required(),
      boramUsed: Joi.string().optional(),
      collarUsed: Joi.string().optional(),
      buttonUsed: Joi.string().optional(),
      fabricUsed: Joi.string().required(),
    }).required(),
    otherwise: Joi.forbidden(),
  }),
  lowerWear: Joi.when("orderOf", {
    is: Joi.valid("lowerWear", "both"),
    then: Joi.object({
      losign: Joi.string().required(),
      hip: Joi.string().required(),
      waist: Joi.string().required(),
      bottom: Joi.string().required(),
      zipUsed: Joi.string().optional(),
      buttonUsed: Joi.string().optional(),
      hookUsed: Joi.string().optional(),
      fabricUsed: Joi.string().required(),
    }).required(),
    otherwise: Joi.forbidden(),
  }),
  headCover: Joi.object({
    type: Joi.string().required(),
    length: Joi.string().required(),
    fabricUsed: Joi.string().required(),
  }).optional(),
});

export { OrderDetails, OrderDetailsValidationSchema };
