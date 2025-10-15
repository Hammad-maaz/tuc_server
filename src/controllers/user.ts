import { Request, Response } from "express";
import { userSchema, UserModel, generateAuthToken } from "../models/user";
import bcrypt from "bcrypt";
import _ from "lodash";

/// Register a new user
const registerUser = async (req: Request, res: Response) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  let user = await UserModel.findOne({ where: { email: req.body.email } });
  if (user) return res.status(400).json({ error: "Email already exists" });

  user = new UserModel(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.status(200).json({ message: "User registered successfully" });
};

/// Login User
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await UserModel.findOne({ where: { email } });
  if (!user)
    return res.status(400).json({ error: "Invalid email or password" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Invalid email or password" });

  const token = generateAuthToken(user);
  res.status(200).json({ token, user: _.pick(user, ["id", "name", "email"]) });
};

export { registerUser, loginUser };
