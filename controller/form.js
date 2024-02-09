import { db } from "../service/db.js";
import App from "../model/app.js";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

export const getmedicalhistory = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "INSERT INTO Exchange (`itemID`, `userID`, `accountID`, `dateExchange`) VALUES (?)";
    const values = [
      req.body.itemID,
      req.body.userID,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("item has been exchange.");
    });
  });
};

export const updateMedicalhistory = (req, res) => {
  const token = req.cookies.accessToken;
  const body = Object.keys(req.body);
  console.log(body);
  jwt.verify(token, "secretkey", (err, userInfo) => {
    User.find()
      .and({ _id: userInfo.id })
      .then((data) => {
        const info = data[0];
        console.log(info);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  });
};

export const reservation = (req, res) => {
  const symtoms = req.body.symtoms;
  const date = req.body.date;
  const month = req.body.month;
  const year = req.body.year;
  const timeslot = req.body.timeslot;
  res.send(
    `Form submitted with symtoms: ${symtoms}, date: ${date}, month: ${month}, year: ${year}, timeslot: ${timeslot}`
  );
};

export const getReservation = (req, res) => {
  res.send(`this is your appointment`);
};
