import mongoose from "mongoose";
import { Schema } from "mongoose";

const docSchema = new Schema({
  doctorID: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, require: true },
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
  gender: { type: String, require: true },
  department: { type: String, require: true },
  appointment_max: { type: Number, default: 14},
  specialist: { type: String, require: true },
  workday: { type: Array, require: true }, // 
  worktime: { type: Array, require: true }, //
  phone: { type: String, require: true },
});

const Doctor = mongoose.model("Doctor", docSchema);

export default Doctor;
