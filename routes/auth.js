import express from "express";
import {
  login,
  signinwithChulaID,
  logout,
  signinwithIDCard,
} from "../controller/auth.js";
const router = express.Router();

router.post("/login", login);
router.post("/signinwithChulaID", signinwithChulaID);
router.post("/signinwithIDCard", signinwithIDCard);
router.post("/logout", logout);

export default router;
