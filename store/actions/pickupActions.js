import * as types from "./actionTypes";
import { fetchStudents as fetchStudentsFirebase } from "../../modules/Firebase";

export const fetchStudents = () => {
  return async (dispatch) => {
    const students = await fetchStudentsFirebase();
    dispatch({ type: types.FETCH_STUDENTS, students });
  };
};
