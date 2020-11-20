import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "../config";
import moment from "moment";
import * as types from "../store/actions/actionTypes";
import { registerForPushNotificationsAsync } from "./Notification";
import Constants from "expo-constants";

let userId;

export default async (store) => {
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

  /***
   * Roles
   * - 0: No Role
   * - 1: Parent
   * - 2: Teacher
   * - 3: Admin
   */

  firebase.auth().onAuthStateChanged(async (user) => {
    if (user != null) {
      const profileMeta = await getUserProfileMeta(user.providerData[0].uid);
      userId = user.providerData[0].uid;

      if (Constants.isDevice) {
        const token = await registerForPushNotificationsAsync();
        await setUserPushToken(token);
      }

      store.dispatch({ type: types.SET_AUTHENTICATED_STATUS, status: true });
      store.dispatch({
        type: types.LOGIN_SUCCESS,
        role: profileMeta.role,
      });
      store.dispatch({
        type: types.SET_PROFILE,
        profile: { ...user.providerData[0], ...profileMeta.meta },
      });
    } else {
      store.dispatch({ type: types.SET_AUTHENTICATED_STATUS, status: false });
      store.dispatch({ type: types.LOGOUT_SUCCESS });
    }
  });
};

const getUserProfileMeta = async (uid) => {
  const snapshot = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get();
  return snapshot.data();
};

export const setUserPushToken = async (token) => {
  await firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .update({ pushToken: token });
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

export const addRegisterPickupStudent = async (uid, studentId) => {
  await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .update({
      "meta.pickupStudents": firebase.firestore.FieldValue.arrayUnion(
        studentId
      ),
    });
};

export const removeRegisterPickupStudent = async (uid, studentId) => {
  await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .update({
      "meta.pickupStudents": firebase.firestore.FieldValue.arrayRemove(
        studentId
      ),
    });
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

export const changePickupPlate = async (uid, plateNo) => {
  await firebase.firestore().collection("users").doc(uid).update({
    "meta.pickupPlate": plateNo,
  });
};

export const fetchCheckinList = async (studentId) => {
  const snapshot = await firebase
    .firestore()
    .collection("checkin")
    .where("studentId", "==", studentId)
    .get();
  return mapDocumentsWithId(snapshot);
};

export const fetchStudents = async () => {
  const snapshot = await firebase.firestore().collection("students").get();
  return mapDocumentsWithId(snapshot);
};
