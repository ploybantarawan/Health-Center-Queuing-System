import { db } from "../service/db.js";

export const getmedicalhistory = (req, res) => {
  res.send(`this is your medical history`);
};

export const updateMedicalhistory = (req, res) => {
  const allegies = req.body.allegies;
  const insurance = req.body.insurance;
  res.send(
    `Form submitted with allegies: ${allegies}, insurance: ${insurance}`
  );
};

export const reservation = (req, res) => {
  const symtoms = req.body.symtoms;
  const date = req.body.date;
  const month = req.body.month;
  const year = req.body.year;
  const timeslot = req.body.timeslot;
  res.send(
    `Form submitted with symtoms: ${symtoms}, date: ${date}, month: ${month}, year: ${year}, timeslot: ${timeslot}`
  );
};

export const getReservation = (req, res) => {
  res.send(`this is your appointment`);
};
