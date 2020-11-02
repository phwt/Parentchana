// import { StatusBar } from "expo-status-bar";
import React from "react";
// import { StyleSheet, Text, View } from "react-native";
import Navigator from "./modules/Navigator";

import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

const App = () => {
  return <Navigator />;
};

export default App;
