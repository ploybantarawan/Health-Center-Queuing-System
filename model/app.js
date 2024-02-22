import mongoose from "mongoose";
import { Schema } from "mongoose";

const appSchema = new Schema({
  userID: { type: String, required: true },
  name: { type: String, require: true },
  surname: { type: String, require: true },
  symptoms: { type: String, require: true },
  date: { type: String, require: true },
  time: { type: String, require: true },
  doctor: { type: String },
});

const App = mongoose.model("App", appSchema);

export default App;
