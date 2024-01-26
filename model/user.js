import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, require: true },
  pictures: [String],
});

const User = mongoose.model("User", userSchema);

export default User;
