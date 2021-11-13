import config from "./config/index.js";
import dotenv from "dotenv";

dotenv.config();

console.log(
  `Starting server on port : ${config.PORT} ! Environment : ${config.ENV}`
);

// start();
