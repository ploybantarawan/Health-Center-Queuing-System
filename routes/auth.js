import express from "express";
import {
  loginWithChulaID,
  loginwithIDCard,
  signinwithChulaID,
} from "../controller/auth.js";
const router = express.Router();

router.post("/loginWithChulaID", loginWithChulaID);
router.post("/loginwithIDCard", loginwithIDCard);
router.post("/signinwithChulaID", signinwithChulaID);

export default router;
