import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "../config";
import moment from "moment";

export default (store) => {
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      store.dispatch({ type: "SET_AUTHENTICATED_STATUS", status: true });
    } else {
      store.dispatch({ type: "SET_AUTHENTICATED_STATUS", status: false });
    }
  });
};

export const mapDocumentsWithId = (snapshot) =>
  snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

export const insertPickupStudent = async (plate, students) => {
  await firebase.firestore().collection("pickup").add({
    timestamp: new Date(),
    plate,
    students,
  });
};

const dayStart = moment().startOf("day").toDate();
const dayEnd = moment().endOf("day").toDate();

export const loadPickupStudents = async () => {
  const snapshot = await firebase
    .firestore()
    .collection("pickup")
    .orderBy("timestamp", "desc")
    .where("timestamp", ">", dayStart)
    .where("timestamp", "<", dayEnd)
    .get();
  return mapDocumentsWithId(snapshot);
};

export const onPickupListChange = (callback) => {
  firebase
    .firestore()
    .collection("pickup")
    .orderBy("timestamp", "desc")
    .where("timestamp", ">", dayStart)
    .where("timestamp", "<", dayEnd)
    .onSnapshot((snapshot) => {
      const mappedStudents = mapDocumentsWithId(snapshot);
      callback(mappedStudents);
    });
};
