import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../middlewears/sequelize";
import Joi from "joi";

export interface IOrder {
  id: number;
  schoolId: number;
  totalPrice: string;
  totalQuantity: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IOrderAttributes extends Optional<IOrder, "id"> {}
class Order extends Model<IOrder, IOrderAttributes> implements IOrder {
  public id!: number;
  public schoolId!: number;
  public totalPrice!: string;
  totalQuantity!: number;
  public isDeleted!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    schoolId: {
      type: DataTypes.INTEGER,
      references: { model: "schools", key: "id" },
    },
    totalPrice: { type: DataTypes.STRING, allowNull: false },
    totalQuantity: { type: DataTypes.INTEGER, allowNull: false },
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
    tableName: "orders",
  }
);

const OrderValidationSchema = Joi.object({
  totalPrice: Joi.string().min(1).max(255).required(),
  totalQuantity: Joi.number().min(1).required(),
  schoolId: Joi.number().min(1).required(),
  isDeleted: Joi.boolean().default(0).optional(),
});

export { Order, OrderValidationSchema };
