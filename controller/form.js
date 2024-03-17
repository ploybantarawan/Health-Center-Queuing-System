import { db } from "../service/db.js";
import App from "../model/app.js";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

export const getmedicalhistory = (req, res) => {
  const token = req.body.token;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    User.findOne({ _id: userInfo.id }).then((data) => {
      return res.status(200).send(data);
    });
  });
};

export const updateMedicalhistory = (req, res) => {
  const token = req.body.token;
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
  const token = req.body.token;
  jwt.verify(token, "secretkey", async (err, userInfo) => {
    const date = req.body.date;
    const time = req.body.time;
    const count = await App.find().countDocuments([
      { date: date },
      { time: time },
    ]);
    return res.status(404).json(count);
  });
};

export const reservation = async (req, res) => {
  const token = req.body.token;
  jwt
    .verify(token, "secretkey", async (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      const symptoms = req.body.symptoms;
      const date = req.body.date;
      const time = req.body.time;
      const doctor = req.body.doctor;

      const count = await App.find().countDocuments([
        { date: date },
        { time: time },
      ]);
      if (count >= 7) return res.status(404).json("timeslot is not aviable");

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

export const getUserReservation = (req, res) => {
  const token = req.body.token;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    App.find({ userID: userInfo.id })
      .then((data) => {
        if (data.length) {
          return res.status(200).send(data);
        } else {
          return res.status(200).json("No appointment");
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  });
};
