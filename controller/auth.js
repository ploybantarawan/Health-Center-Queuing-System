import { db } from "../service/db.js";
import User from "../model/user.js";
import Staff from "../model/staff.js";
import Doc from "../model/doc.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const username = req.body.UserID;
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
          .json({
            msg: `Login successful with username: ${username}`,
            token: token,
          });
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
  const email = req.body.email;
  const address = req.body.address;
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
        return res.status(404).json("the username is already been use");
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
          email: email,
          address: address,
          mediclaRecord: mediclaRecord,
        })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
        return res.status(200).json({
          msg: `Sign in successful with username: ${username}`,
          token: token,
        });
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
  const email = req.body.email;
  const address = req.body.address;
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
    return res.status(401).json("Invalid ID Card Number");

  User.find()
    .and({ username: username })
    .then((data) => {
      console.log(data);
      if (data.length != 0) {
        return res.status(404).json("the username is already been use");
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
          email: email,
          address: address,
          mediclaRecord: mediclaRecord,
        })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
        return res.status(200).json({
          msg: `Sign in successful with username: ${username}`,
          // token: token,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

export const signinwithEmail = (req, res) => {
  // ไม่มี DB เก็บ Prefix
  const email = req.body.email;
  const username = email;
  const name = req.body.first_name;
  const phone = req.body.phone;
  const surname = req.body.last_name;
  const chulaID = req.body.patientId;
  const idCard = req.body.national_id;
  const gender = req.body.gender;
  const type = req.body.civil;
  const birthday = req.body.birthday;
  
  const address = req.body.address;
  const mediclaRecord = req.body.mediclaRecord;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  console.log(req.body);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  if (!isValidEmail(username)) return res.status(401).json("Invalid email");

  User.find()
    .and({ username: username })
    .then((data) => {
      console.log(data);
      if (data.length != 0) {
        return res.status(409).json("the username is already been use");
      } else {
        User.create({
          username: username,
          password: hashedPassword,
          name: name,
          surname: surname,
          idCard: idCard,
          chulaID: chulaID,
          gender: gender,
          type: type,
          phone: phone,
          birthday: birthday,
          email: email,
          address: address,
          mediclaRecord: mediclaRecord,
        })
          .then((data) => {
            console.log(data);
            const token = jwt.sign({ id: data.id }, "secretkey");
            return res.status(200).json({
              msg: `Sign in successful with username: ${username}`,
              token: token,
            });
          })
          .catch((err) => {
            console.log(err);
          });
        
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

export const staffSignin = (req, res) => {
  // staffID is Username for login
  const { first_name , staffID, last_name, gender, phone, password} = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  Staff.find()
    .and({ username: staffID })
    .then((data) => {
      console.log(data);
      if (data.length != 0) {
        return res.status(404).json("the username is already been use");
      } else {
        Staff.create({
          username: staffID,
          password: hashedPassword,
          name: first_name,
          surname: last_name,
          gender,
          phone,
          email: '',
        })
          .then((data) => {
            console.log(data);
            const token = jwt.sign({ id: data.id }, "secretkey");
            return res.status(200).json({
              msg: `Sign in successful with username as StaffID: ${staffID}`,
              token: token,
              user: data
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err)
          });
        
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

export const loginStaff = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  Staff.find()
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
          .json({
            msg: `Login successful with username: ${username}`,
            token: token,
          });
      } else {
        res.status(401).json("Invalid credentials");
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

export const docSignin = (req, res) => {
  console.log(req.body);
  // Department ไม่มี ไม่รู้จะเอาใว้ Column ไหน
  const docID = req.body.docID;
  const status = req.body.status;
  const name = req.body.first_name;
  const surname = req.body.last_name;
  const gender = req.body.gender;
  const specialist = req.body.specialist;
  const workday = req.body.workday;
  const worktime = req.body.worktime;
  const phone = req.body.phone;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  Doc.find()
    .and({ docID: docID })
    .then((data) => {
      console.log(data);
      if (data.length != 0) {
        return res.status(404).json("the username is already been use");
      } else {
        Doc.create({
          docID: docID,
          password: hashedPassword,
          status: status,
          name: name,
          surname: surname,
          specialist: specialist,
          gender: gender,
          phone: phone,
          workday: workday,
          worktime: worktime,
        })
          .then((data) => {
            console.log("lol");
            console.log(data);
            const token = jwt.sign({ id: data.id }, "secretkey");
            return res.status(200).json({
              msg: `Sign in with Username as DoctorID: ${docID}`,
              token: token,
              user: data
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

export const loginDoc = (req, res) => {
  const docID = req.body.docID;
  const password = req.body.password;

  Doc.find()
    .and({ docID: docID })
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
          .json({
            msg: `Login with Username: ${docID}`,
            token: token,
          });
      } else {
        res.status(401).json("Invalid credentials");
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};
