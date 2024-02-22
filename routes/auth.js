import express from "express";
import {
  login,
  signinwithChulaID,
  logout,
  signinwithIDCard,
  signinwithEmail,
  staffSignin,
  loginStaff,
  docSignin,
  loginDoc,
} from "../controller/auth.js";
const router = express.Router();

router.post("/login", login);
router.post("/signinwithChulaID", signinwithChulaID);
router.post("/signinwithIDCard", signinwithIDCard);
router.post("/signinwithEmail", signinwithEmail);
router.post("/staffSignin", staffSignin);
router.post("/loginStaff", loginStaff);
router.post("/docSignin", docSignin);
router.post("/loginDoc", loginDoc);
router.post("/logout", logout);

export default router;
