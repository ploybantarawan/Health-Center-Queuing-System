import express from "express";
import {
  getmedicalhistory,
  updateMedicalhistory,
  reservation,
} from "../controller/form.js";
const router = express.Router();

router.get("/medicalHistory", getmedicalhistory);
router.post("/updateMedicalHistory", updateMedicalhistory);
router.post("/reservation", reservation);

export default router;
