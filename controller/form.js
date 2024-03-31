import { db } from "../service/db.js";
import App from "../model/app.js";
import User from "../model/user.js";
import Doc from "../model/doc.js";
import jwt from "jsonwebtoken";
import docTypeCheck from "../middleware/docTypeCheck.js";
import { getToken } from "../middleware/tokenCheck.js";
import moment from "moment";

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
      const fever = req.body.fever || false;
      let appointment_count = 0;
      // console.log(req.body);
      // const count = await App.find().countDocuments([
      //   { date: date },
      //   { time: time },
      // ]);
      // if (count >= 7) return res.status(404).json("timeslot is not aviable");

      // skip for test
      // const docCheck = await docTypeCheck(date, time, department);
      // if (!docCheck) return res.status(404).json("timeslot is not aviable");
      const doctorData = await Doc.find({ _id: doctor});
      // const doctors = await Doc.find({
      //   "workday.work_day": workday,
      // });
      for (let doctor of doctorData) {
        const appointmentToday = await App.find({
          doctor: doctor.id,
          date: date,
        });
        appointmentToday.forEach((appoint) => {
          const work_day = doctor.workday.find(item => item.work_day == moment(appoint.date).format('dddd').toUpperCase());
          let work_time = work_day.work_time.find(item => item.work_time == appoint.time);
          work_time.appointment_count = work_time.appointment_count ? work_time.appointment_count + 1 : 1;
        });
      }
      doctorData[0].workday.forEach(day => {
        if (moment(date).format('dddd').toUpperCase() == day.work_day) {
          day.work_time.forEach(tt => {
            if (time == tt.work_time) {
              appointment_count = tt.appointment_count
            }
          })
        }
      })
      // console.log(appointment_count, doctorData[0].appointment_max);
      if (appointment_count >= doctorData[0].appointment_max ) {
        return  res
        .status(401)
        .json('จำนวนสล็อตเต็มแล้ว');
      }
      App.findOne()
        .and([{ date: date }, { time: time }])
        .then((data) => {
          User.find({ _id: userInfo.id })
            .then((data) => {
              // console.log(data);
              App.create({
                userID: userInfo.id,
                first_name: data[0].first_name,
                last_name: data[0].last_name,
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
