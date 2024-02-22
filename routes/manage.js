import express from "express";
import {
  getAllReservation,
  getTimeslot,
  getAllDoctor,
  getDoctorTimetable,
  addDoctor,
  updateDoctor,
  getTodayPatientDoc,
} from "../controller/manage.js";
const router = express.Router();

router.get("/getAllReservation", getAllReservation);
router.get("/getTimeslot", getTimeslot);
router.get("/getAllDoctor", getAllDoctor);
router.get("/getDoctorTimetable", getDoctorTimetable);
router.get("/addDoctor", addDoctor);
router.get("/updateDoctor", updateDoctor);
router.get("/getTodayPatientDoc", getTodayPatientDoc);

export default router;
