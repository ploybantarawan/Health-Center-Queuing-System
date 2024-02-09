import { db } from "../service/db.js";
import mongoose from "mongoose";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
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
        const token = jwt.sign({ id: data[0].id }, "secretkey");
        const { password, ...others } = data[0];
        res
          .cookie("accessToken", token, { httpOnly: true })
          .status(200)
          .json(`Login successful with username: ${username}`);
      } else {
        res.status(401).json("Invalid credentials");
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      seure: true,
    })
    .status(200)
    .json("User has been logged out.");
};

export const signinwithChulaID = (req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  const phone = req.body.phone;
  const surname = req.body.surname;
  const gender = req.body.gender;
  const type = req.body.type;
  const idCard = req.body.idCard;
  const birthday = req.body.birthday;
  const mediclaRecord = req.body.mediclaRecord;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  function checkStrDigit(username) {
    return /^\d+$/.test(username);
  }
  function checklength(username) {
    return username.length == 10;
  }
  if (!checkStrDigit(username) || !checklength(username))
    return res.status(404).json("Invalid ChulaID");

  User.find()
    .and({ username: username })
    .then((data) => {
      console.log(data);
      if (data.length != 0) {
        return res.status(404).json("the username is alredy been use");
      } else {
        User.create({
          username: username,
          password: hashedPassword,
          name: name,
          surname: surname,
          idCard: idCard,
          chulaID: username,
          gender: gender,
          type: type,
          phone: phone,
          birthday: birthday,
          mediclaRecord: mediclaRecord,
        })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
        return res
          .status(200)
          .json(`Sign in successful with Username: ${username}`);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

export const signinwithIDCard = (req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  const phone = req.body.phone;
  const surname = req.body.surname;
  const chulaID = req.body.chulaID;
  const gender = req.body.gender;
  const type = req.body.type;
  const birthday = req.body.birthday;
  const mediclaRecord = req.body.mediclaRecord;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  function checkStrDigit(username) {
    return /^\d+$/.test(username);
  }
  function checklength(username) {
    return username.length == 13;
  }
  if (!checkStrDigit(username) || !checklength(username))
    return res.status(404).json("Invalid ID Card Number");

  User.find()
    .and({ username: username })
    .then((data) => {
      console.log(data);
      if (data.length != 0) {
        return res.status(404).json("the username is alredy been use");
      } else {
        User.create({
          username: username,
          password: hashedPassword,
          name: name,
          surname: surname,
          idCard: username,
          chulaID: chulaID,
          gender: gender,
          type: type,
          phone: phone,
          birthday: birthday,
          mediclaRecord: mediclaRecord,
        })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
        return res
          .status(200)
          .json(`Form submitted with Username: ${username}`);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};
