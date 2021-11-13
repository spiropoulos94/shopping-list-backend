import config from "../config/index.js";
import { User } from "../resources/user/user.model.js";
import jwt from "jsonwebtoken";

// Create new jwt token
export const newToken = (user) => {
  return jwt.sign({ id: user.id }, config.SECRETS.JWT_SECRET, {
    expiresIn: config.SECRETS.JWT_EXP,
  });
};

// Verify token and extract payload
export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

// Sign up
export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "need email and password" });
  }

  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (e) {
    return res.status(500).end();
  }
};

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "need email and password" });
  }

  const invalidAttempt = { message: "Invalid email and password combination" };
  const invalidUser = { message: "This user does not exist" };

  try {
    const user = await User.findOne({ email: req.body.email })
      .select("email password")
      .exec();

    if (!user) {
      return res.status(401).send(invalidUser);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).send(invalidAttempt);
    }

    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
