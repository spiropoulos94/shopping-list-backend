import mongoose from "mongoose";
import config from "./index";

export const connect = () => {
  mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
};
