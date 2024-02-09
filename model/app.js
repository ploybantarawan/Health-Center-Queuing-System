import mongoose from "mongoose";
import { Schema } from "mongoose";

const appSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, require: true },
  symptom: { type: String, require: true },
  date: { type: Date, require: true },
  doctor: { type: String },
});

const App = mongoose.model("App", appSchema);

export default App;
