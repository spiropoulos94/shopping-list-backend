import mongoose from "mongoose";
import config from "../config/index.js";

export const connect = async () => {
  await mongoose
    .connect(config.DB_URL, {
      useNewUrlParser: true,
    })
    .catch((e) => {
      console.log(e);
    });
};
