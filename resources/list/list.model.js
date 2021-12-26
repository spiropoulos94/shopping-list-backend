import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
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
    items: [String], //check
  },
  { timestamps: true }
);

export const List = mongoose.model("list", listSchema);
