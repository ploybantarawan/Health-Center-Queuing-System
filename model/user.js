import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, require: true },
  prefix: { type: String, require: true },
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
  idCard: { type: String },
  chulaID: { type: String },
  gender: { type: String, require: true },
  patient_type: { type: String, require: true },
  phone: { type: String, require: true },
  birthday: { type: String, require: true },
  email: { type: String },
  address: { type: String },
  mediclaRecord: { type: String, require: true },
  drug_allergy: { type: String, require: true },
});

const User = mongoose.model("User", userSchema);

export default User;
