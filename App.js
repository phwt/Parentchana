import React from "react";
import Navigator from "./modules/Navigator";
import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import Color from "./modules/Color";

import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "./config";

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const theme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: Color.primary,
    accent: Color.secondary,
    success: Color.success,
    info: Color.info,
    warning: Color.warning,
    danger: Color.danger,
  },
};

const CombinedDefaultTheme = {
  ...theme,
  ...NavigationDefaultTheme,
  colors: {
    ...theme.colors,
    ...NavigationDefaultTheme.colors,
  },
};

const App = () => {
  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <NavigationContainer theme={CombinedDefaultTheme}>
        <Navigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
