import mongoose from "mongoose";
import config from "../config/index.js";

export const connect = () => {
  mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
  });
};
