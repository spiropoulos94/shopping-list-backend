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
    console.log(e);
    return res.status(500).end();
  }
};

export const signin = async (req, res) => {
  // 1. Check if email and password are provided

  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "need email and password" });
  }

  const invalidAttempt = { message: "Invalid email and password combination" };
  const invalidUser = { message: "This user does not exist" };

  try {
    // 2. Check if user exists (search by email)
    const user = await User.findOne({ email: req.body.email })
      .select("email password")
      .exec();

    if (!user) {
      return res.status(401).send(invalidUser);
    }

    // 3. Check if user exists and password is correct
    const match = await user.checkPassword(req.body.password);

    console.log("match mesa sto auth", match);

    if (!match) {
      return res.status(401).send(invalidAttempt);
    }

    // 4. Create token and return it
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (e) {
    console.error(e, "Logged inside sign in controller");
    res.status(500).end();
  }
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }

  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    .select("-password")
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};
