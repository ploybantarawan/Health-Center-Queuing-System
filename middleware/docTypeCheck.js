import App from "../model/app.js";

export async function docTypeCheck(date, time, department) {
  try {
    const count = await App.find({ date: date }, { time: time }).countDocuments(
      { department: department }
    );
      
    if ((department = "GP")) {
      if (count >= 11) return false;
    }
    if ((department = "O-hand")) {
      if (count >= 9) return false;
    }
    if ((department = "Cardio")) {
      if (count >= 8) return false;
    }
    if ((department = "ENT")) {
      if (count >= 7) return false;
    }
    if ((department = "Endocrine")) {
      if (count >= 8) return false;
    }

    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export default docTypeCheck;
