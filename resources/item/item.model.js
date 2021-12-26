import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    notes: String,
    things: [String], //check
  },
  { timestamps: true }
);

export const Item = mongoose.model("item", itemSchema);
