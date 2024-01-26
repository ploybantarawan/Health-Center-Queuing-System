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
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  User.find()
    .and({ username: username }, { password: hashedPassword })
    .then((data) => {
      console.log(data);
      if (data.length != 0) return res.send(`login with username: ${username}`);
      return res.status(400).json("Wrong Password or Username!");
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json("Wrong Password or Username!");
    });
};

export const signinwithChulaID = (req, res) => {
  const username = req.body.username;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

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
  res.send(`Form submitted with Username: ${username}`);
};
