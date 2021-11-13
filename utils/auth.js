import config from "../config/index.js";
import { User } from "../resources/user/user.model.js";
import jwt from "jsonwebtoken";

export const newToken = (user) => {
  return jwt.sign({ id: user.id }, config.SECRETS.JWT_SECRET, {
    expiresIn: config.SECRETS.JWT_EXP,
  });
};
