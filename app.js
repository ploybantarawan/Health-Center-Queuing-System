import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
// dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "cookie-session";

// const uri = process.env.URI;
// // console.log(uri);
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(uri, {})
//   .then(() => {
//     console.log("Database Connected!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Initialize Passport middleware
app.use(session({ secret: "cat" }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
import homeRouter from "./routes/home.js";
import authRouter from "./routes/auth.js";
import formRouter from "./routes/form.js";
import manageRouter from "./routes/manage.js";
// const loginRouter = require("./controller/login");
// const formRouter = require("./controller/form");

app.use("/", homeRouter);
app.use("/auth", authRouter);
app.use("/form", formRouter);
app.use("/manage", manageRouter);
// app.use("/form", formRouter);
// app.use("/login", loginRouter);

// app.get("/", (req, res) => {
//   res.send("Welcome to the homepage!");
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
