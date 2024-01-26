import { db } from "../service/db.js";

export const getAllReservation = (req, res) => {
  res.send(`this is reservation of month: `);
};

export const getTimeslot = (req, res) => {
  res.send(`this is timeslot of month: `);
};

export const getAvailableDate = (req, res) => {
  res.send(`this is Available Date of month: `);
};

export const getAvailableTime = (req, res) => {
  res.send(`this is Available Time of Date: `);
};

export const getAllDoctor = (req, res) => {
  res.send(`this is Doctor timetable: `);
};

export const getDoctorTimetable = (req, res) => {
  res.send(`this is timetable of: `);
};
