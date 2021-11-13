import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  ENV: process.env.NODE_ENV || "development",
  SECRETS: {
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    JWT_EXP: process.env.JWT_EXP || "7d",
  },
};

export default config;
