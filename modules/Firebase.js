import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "../config";

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
