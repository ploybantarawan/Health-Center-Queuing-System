import Staff from "../model/staff.js";
import Doc from "../model/doc.js";

export async function getToken(token) {
  try {
    if (!token) return false;
    return token.split('Bearer')[1].trim();
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function checkStaff(id) {
  try {
    let result = false;
    const count = await Staff.findById(id).countDocuments({ _id: id });
    if (count > 0) {
      result = true;
    }
    return result; // Return true if there are documents, otherwise false
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export async function checkDoc(id) {
  try {
    let result = false;
    const count = await Doc.findById(id).countDocuments({ _id: id });
    if (count > 0) {
      result = true;
    }
    return result; // Return true if there are documents, otherwise false
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
