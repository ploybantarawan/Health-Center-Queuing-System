import { db } from "../service/db.js";
import mongoose from "mongoose";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginWithChulaID = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  res.send(`Form submitted with Name: ${username}, Email: ${password}`);
};

export const loginwithIDCard = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.find()
    .and({ username: username })
    .then(async (data) => {
      if (!data.length)
        return res.status(400).json("Wrong Password or Username!");
      const storedHashedPassword = data[0].password;
      const isPasswordValid = await bcrypt.compare(
        password,
        storedHashedPassword
      );
      if (isPasswordValid) {
        res.status(200).json("Login successful");
      } else {
        res.status(401).json("Invalid credentials");
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
};

export const signinwithChulaID = (req, res) => {
  const username = req.body.username;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  User.find()
    .and({ username: username })
    .then((data) => {
      console.log(data);
      if (data.length != 0) {
        return res.send("the username is alredy been use");
      } else {
        User.create({
          username: username,
          password: hashedPassword,
        })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
        return res.send(`Form submitted with Username: ${username}`);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });

  // User.create({
  //   username: username,
  //   password: hashedPassword,
  // })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // res.send(`Form submitted with Username: ${username}`);
};
