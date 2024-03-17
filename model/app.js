import mongoose from "mongoose";
import { Schema } from "mongoose";

const appSchema = new Schema({
  userID: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  symptoms: { type: String, required: true },
  cause: { type: String, required: true },
  period: { type: String, required: true },
  fever: { type: String, required: true },
  department: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  doctor: { type: String },
});

const App = mongoose.model("App", appSchema);

export default App;
