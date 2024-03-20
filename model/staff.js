import mongoose from "mongoose";
import { Schema } from "mongoose";

const staffSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  surname: { type: String, require: true },
  chulaID: { type: String },
  gender: { type: String, require: true },
  type: { type: String, require: true },
  phone: { type: String },
  birthday: { type: String },
  email: { type: String },
});

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
