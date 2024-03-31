import express from "express";
import {
  getAllReservation,
  getTimeslot,
  getAllDoctor,
  getDoctorTimetable,
  addDoctor,
  updateDoctor,
  getTodayPatientDoc,
  getAllDoctorTable,
  getDoctor,
  getDoctors,
} from "../controller/manage.js";
const router = express.Router();

router.post("/getAllDoctorTable", getAllDoctorTable);
router.get("/getAllReservation", getAllReservation);
router.post("/getTimeslot", getTimeslot);
router.post("/getAllDoctor", getAllDoctor);
router.get("/getDoctorTimetable", getDoctorTimetable);
router.get("/addDoctor", addDoctor);
router.post("/updateDoctor", updateDoctor);
router.get("/getTodayPatientDoc", getTodayPatientDoc);
router.post("/getDoctor", getDoctor);
router.get("/getDoctors", getDoctors);

export default router;
