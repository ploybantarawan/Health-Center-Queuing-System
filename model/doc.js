import mongoose from "mongoose";
import { Schema } from "mongoose";

const docSchema = new Schema({
  docID: { type: String, required: true },
  status: { type: String, require: true },
  name: { type: String, require: true },
  surname: { type: String, require: true },
  specialist: { type: String, require: true },
  workday: { type: Array, require: true },
  worktime: { type: Array, require: true },
});

const Doc = mongoose.model("Doc", docSchema);

export default Doc;
