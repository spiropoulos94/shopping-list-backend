import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    notes: String,
  },
  { timestamps: true }
);

export const Item = mongoose.model("item", itemSchema);
