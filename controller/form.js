import { db } from "../service/db.js";
import App from "../model/app.js";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
import docTypeCheck from "../middleware/docTypeCheck.js";
import { getToken } from "../middleware/tokenCheck.js";

export const getmedicalhistory = async (req, res) => {
  const token = await getToken(req.headers.authorization);
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    User.findOne({ _id: userInfo.id }).then((data) => {
      return res.status(200).send(data);
    });
  });
};

export const updateMedicalhistory = async (req, res) => {
  const token = await getToken(req.headers.authorization);
  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    User.findByIdAndUpdate(userInfo.id, req.body)
      .then((data) => {
        return res.status(200).json("update successful");
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  });
};

export const countReservation = async (req, res) => {
  const token = await getToken(req.headers.authorization);
  jwt
    .verify(token, "secretkey", async (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      const date = req.body.date;
      const time = req.body.time;
      const count = await App.find().countDocuments([
        { date: date },
        { time: time },
      ]);
      return res.status(200).json(count);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

export const reservation = async (req, res) => {
  const token = await getToken(req.headers.authorization);
  jwt
    .verify(token, "secretkey", async (err, userInfo) => {
      if (err) return res.status(409).json("Token is not valid!");
      const symptoms = req.body.symptoms;
      const date = req.body.date;
      const time = req.body.time;
      const department = req.body.department;
      const doctor = req.body.doctor;
      const cause = req.body.cause;
      const period = req.body.period;
      const fever = req.body.fever;
      // const count = await App.find().countDocuments([
      //   { date: date },
      //   { time: time },
      // ]);
      // if (count >= 7) return res.status(404).json("timeslot is not aviable");

      // skip for test
      // const docCheck = await docTypeCheck(date, time, department);
      // if (!docCheck) return res.status(404).json("timeslot is not aviable");

      App.findOne()
        .and([{ date: date }, { time: time }])
        .then((data) => {
          User.find({ _id: userInfo.id })
            .then((data) => {
              App.create({
                userID: userInfo.id,
                name: data[0].name,
                surname: data[0].surname,
                symptoms: symptoms,
                cause: cause,
                period: period,
                fever: fever,
                department: department,
                date: date,
                time: time,
                doctor: doctor,
              })
                .then((data) => {
                  // console.log(data);
                  return res
                    .status(200)
                    .json(
                      `reservation sucessful with date: ${date}, time: ${time}`
                    );
                })
                .catch((err) => {
                  console.log(err);
                  return res.status(500).json(err);
                });
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json(err);
            });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

export const getUserReservation = async (req, res) => {
  const token = await getToken(req.headers.authorization);
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    App.find({ userID: userInfo.id })
      .then((data) => {
        if (data.length) {
          return res.status(200).send(data);
        } else {
          return res.status(201).json("No appointment");
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  });
};
