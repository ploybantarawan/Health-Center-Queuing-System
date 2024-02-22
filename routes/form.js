import express from "express";
import {
  getmedicalhistory,
  updateMedicalhistory,
  reservation,
  getUserReservation,
} from "../controller/form.js";
const router = express.Router();

router.get("/medicalHistory", getmedicalhistory);
router.post("/updateMedicalHistory", updateMedicalhistory);
router.post("/reservation", reservation);
router.get("/getUserReservation", getUserReservation);

export default router;
