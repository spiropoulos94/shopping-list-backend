import express from "express";
import body_parser from "body-parser";
import morgan from "morgan";
import config from "./config/index.js";
import cors from "cors";
import { signup, signin, protect } from "./utils/auth.js";
import { connect } from "./utils/db.js";
import userRouter from "./resources/user/user.router.js";
import itemRouter from "./resources/item/item.router.js";

export const app = express();

let { json, urlencoded } = body_parser;

app.disable("x-powered-by");

app.get("/api", (req, res) => {
  res.send({ data: "Hello World" });
});

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/signup", signup);
app.post("/signin", signin);

app.use("/api", protect);
app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(config.PORT, () => {
      console.log(`REST API on http://localhost:${config.PORT}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};
