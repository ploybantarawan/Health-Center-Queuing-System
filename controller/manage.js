import { db } from "../service/db.js";
import App from "../model/app.js";
import Doc from "../model/doc.js";
import User from "../model/user.js";
import Staff from "../model/staff.js";
import jwt from "jsonwebtoken";
import { checkDoc, checkStaff, getToken } from "../middleware/tokenCheck.js";
import moment from "moment";

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doc.find();
    if (doctors) {
      res.status(200).json(doctors);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.log(error);
  }
}

export const getDoctor = async (req, res) => {
  try {
    // console.log(req.headers);
    const doctor = await Doc.findById(req.body.id);
    if (doctor) {
      res.status(200).json(doctor.workday);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.log(error);
  }
}

export const getAllDoctorTable = async (req, res) => {
  try {
    const token = await getToken(req.headers.authorization);
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
    });
    const current_day_select = req.body.data.day_select;
    const doctorID = req.body.data.doctorID;
    // console.log(moment(current_day_select).weekday());
    // const appointments = await App.find({ date: { $gte: first_day, $lte: last_day}});
    let doctors;
    if (!doctorID) {
      doctors = await Doc.find();
    } else {
      doctors = await Doc.find({ _id: doctorID });
    }
    const daytoday = moment(current_day_select).weekday() ;
    if (daytoday == 6 || daytoday == 7) {
      return res.status(200).json(doctors)
    }
    const first_day = moment(current_day_select).weekday(1).format('YYYY-MM-DD');
    const last_day = moment(current_day_select).weekday(5).format('YYYY-MM-DD');
    for (let doctor of doctors) {
      // console.log(doctor);
      const appointmentToday = await App.find({
        date: { $gte: first_day, $lte: last_day},
        doctor: doctor.id,
      });
      // console.log(appointmentToday);
      // console.log(appointmentToday);
      appointmentToday.forEach((appoint) => {
        
        const work_day = doctor.workday.find(item => item.work_day == moment(appoint.date).format('dddd').toUpperCase());
        let work_time = work_day.work_time.find(item => item.work_time == appoint.time);
        work_time.appointment_count = work_time.appointment_count ? work_time.appointment_count + 1 : 1;
      });
    }
    return res.status(200).json(doctors)
  } catch (error) {
    console.log(error);
  }
}

export const getAllReservation = async (req, res) => {
  const token = await getToken(req.headers.authorization);
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const month = req.body.month;
    App.find()
      .and({ month: month })
      .then((data) => {
        if (data.length) {
          return res.status(200).json(data);
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

export const getTimeslot = async (req, res) => {
  const token = await getToken(req.headers.authorization);
  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const { doctorID, date, time } = req.body.data;
    const users = await User.find();
    const appointments = await App.aggregate([
      {
        $match: {
          date: moment(date).format('YYYY-MM-DD'),
          time,
          doctor: doctorID,
        }
      }
    ]);
    const doctor = await Doc.findById(doctorID)
    appointments.forEach(app => {
      app.user = users.find(item => item.id == app.userID)
    })
    if (appointments.length >= 1) {
      return res.status(200).json({doctor,appointments});
    } else {
      return res.status(201).json("No appointment");
    }
  });
};

export const getAllDoctor = async (req, res) => {
  const token = await getToken(req.headers.authorization);
  // console.log(req.headers);
  const { date } = req.body;
  const workday = moment(date).format('dddd').toUpperCase();
  const workdate = moment(date).format('YYYY-MM-DD');
  // console.log(workday, workdate);
  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(409).json("Token is not valid!");
    const doctors = await Doc.find({
      "workday.work_day": workday,
    });
    for (let doctor of doctors) {
      const appointmentToday = await App.find({
        doctor: doctor.id,
        date: workdate,
      });
      appointmentToday.forEach((appoint) => {
        const work_day = doctor.workday.find(item => item.work_day == moment(appoint.date).format('dddd').toUpperCase());
        let work_time = work_day.work_time.find(item => item.work_time == appoint.time);
        work_time.appointment_count = work_time.appointment_count ? work_time.appointment_count + 1 : 1;
      });
    }
    if (doctors.length) {
      return res.status(200).json(doctors);
    } else {
      return res.status(201).json("No doctor");
    }
  });
};

export const getDoctorTimetable = async (req, res) => {
  const token = await getToken(req.headers.authorization);
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const date = req.body.date;
    const status = req.body.status;
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
            return res.status(201).json("No doctor");
          }
        } else {
          return res.status(201).json("No doctor");
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  });
};

export const addDoctor = async (req, res) => {
  const token = await getToken(req.headers.authorization);
  jwt.verify(token, "secretkey", async (err, userInfo) => {
    const isDoc = await checkDoc(userInfo.id);
    const isStaff = await checkStaff(userInfo.id);
    if (!isDoc && !isStaff) return res.status(403).json("Unauthorise");

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

export const updateDoctor = async (req, res) => {
  const token = await getToken(req.headers.authorization);
  jwt.verify(token, "secretkey", async (err, userInfo) => {
    // console.log(userInfo);
    // const isDoc = await checkDoc(userInfo.id);
    // const isStaff = await checkStaff(userInfo.id);
    // if (!isDoc && !isStaff) return res.status(403).json("Unauthorise");

    try {
      const { id, isWork, work_day, work_time } = req.body;
      console.log(id, isWork, work_day, work_time);
      const filter = { "_id": id }; // ตัวกรองเอกสาร
      const updateDocument = {
          $set: { "workday.$[day].work_time.$[time].isWork": isWork } // ค่าที่ต้องการอัปเดต
      };

      const options = {
          arrayFilters: [{ "day.work_day": work_day }, { "time.work_time": work_time }] // เงื่อนไขในการอัปเดต work_time ที่มี work_time เป็น "TIME_4" ใน FRIDAY
      };

      const result = await Doc.updateOne(filter, updateDocument, options);
      console.log(`${result.modifiedCount} document(s) was/were updated.`);
      if (result.modifiedCount >= 1) {
        res.status(200).json("อัพเดตสำเร็จ " + result.modifiedCount);
      } else {
        res.status(409).json("อัพเดตไม่สำเร็จ");
      }
  } catch (error) {
    console.log(error);
    res.status(409).json("อัพเดตไม่สำเร็จ");
  }
  });
};

export const getTodayPatientDoc = async (req, res) => {
  const token = await getToken(req.headers.authorization);
  jwt.verify(token, "secretkey", async (err, userInfo) => {
    const isDoc = await checkDoc(userInfo.id);
    const isStaff = await checkStaff(userInfo.id);
    if (!isDoc && !isStaff) return res.status(403).json("Unauthorise");

    const date = req.body.date;
    const doc = req.body.doctor;
    App.find()
      .and({ date: date, doctor: doc })
      .then((data) => {
        if (data.length) {
          return res.status(200).json(data);
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
