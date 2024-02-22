import { db } from "../service/db.js";
import App from "../model/app.js";
import Doc from "../model/doc.js";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

export const getAllReservation = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const month = req.body.month;
    App.find()
      .and({ month: month })
      .then((data) => {
        if (data.length) {
          return res.status(200).json(data);
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

export const getTimeslot = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const date = req.body.date;
    const time = req.body.time;
    App.find()
      .and({ date: date, time: time })
      .then((data) => {
        if (data.length) {
          return res.status(200).json(data);
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

export const getAllDoctor = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    Doc.find()
      .then((data) => {
        if (data.length) {
          return res.status(200).json(data);
        } else {
          return res.status(200).json("No doctor");
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  });
};

export const getDoctorTimetable = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const date = req.body.date;
    Doc.find()
      .and({ status: req.body.status })
      .then((data) => {
        if (data.length) {
          let doc = [];
          for (let i = 0; i < data.length; i++) {
            let workday = data[i].workday;
            for (let j = 0; j < workday.length; j++) {
              if (workday[j] === date) {
                doc.push(data[i]);
                break;
              }
            }
          }
          if (doc.length) {
            return res.status(200).send(doc);
          } else {
            return res.status(200).json("No doctor");
          }
        } else {
          return res.status(200).json("No doctor");
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  });
};

export const addDoctor = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const docID = req.body.docID;
    const status = req.body.status;
    const name = req.body.name;
    const surname = req.body.surname;
    const specialist = req.body.specialist;
    const workday = req.body.workday;
    const worktime = req.body.worktime;
    const phone = req.body.phone;
    Doc.create({
      docID: docID,
      status: status,
      name: name,
      surname: surname,
      specialist: specialist,
      workday: workday,
      worktime: worktime,
      phone: phone,
    })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  });
};

export const updateDoctor = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const docID = req.body.docID;
    Doc.findOneAndUpdate({ docID: docID }, req.body)
      .then((data) => {
        return res.status(200).json("update successful");
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  });
};

export const getTodayPatientDoc = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const date = req.body.date;
    const doc = req.body.doctor;
    App.find()
      .and({ date: date, doctor: doc })
      .then((data) => {
        if (data.length) {
          return res.status(200).json(data);
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
