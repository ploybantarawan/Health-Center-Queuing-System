import express from "express";
import {
  getAllReservation,
  getTimeslot,
  getAvailableDate,
  getAvailableTime,
  getAllDoctor,
  getDoctorTimetable,
} from "../controller/manage.js";
const router = express.Router();

router.get("/getAllReservation", getAllReservation);
router.get("/getTimeslot", getTimeslot);
router.get("/getAvailableDate", getAvailableDate);
router.get("/getAvailableTime", getAvailableTime);
router.get("/getAllDoctor", getAllDoctor);
router.get("/getDoctorTimetable", getDoctorTimetable);


export default router;
