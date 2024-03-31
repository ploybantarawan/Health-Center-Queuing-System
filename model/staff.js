import mongoose from "mongoose";
import { Schema } from "mongoose";

const staffSchema = new Schema({
  staffID: { type: String, required: true },
  password: { type: String, require: true },
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
  chulaID: { type: String },
  gender: { type: String, require: true },
  type: { type: String, require: true },
  phone: { type: String },
  birthday: { type: String },
  email: { type: String },
});

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
