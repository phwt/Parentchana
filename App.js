import React from "react";
import Navigator from "./modules/Navigator";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Color from "./modules/Color";

import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "./config";

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Color.primary,
    accent: Color.secondary,
    success: Color.success,
    info: Color.info,
    warning: Color.warning,
    danger: Color.danger,
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Navigator />
    </PaperProvider>
  );
};

export default App;
