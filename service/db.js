import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const uri = process.env.URI;
// console.log(uri);
mongoose.set("strictQuery", false);
export const db = mongoose
  .connect(uri, {})
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((err) => {
    console.log(err);
  });
