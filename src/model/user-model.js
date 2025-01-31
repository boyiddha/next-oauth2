import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  resetToken: {
    type: String,
    default: null,
  },
  resetTokenExpiration: {
    type: Date,
    default: null,
  },
});

export const User =
  mongoose.models.userTapascripts ??
  mongoose.model("userTapascripts", userSchema);
