import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const User = new model("User", userSchema);

export default User;
