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
import "firebase/auth";
import { firebaseConfig } from "./config";

import configureStore from "./store/configureStore";
import { Provider as ReduxProvider } from "react-redux";

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

import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const store = configureStore();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={CombinedDefaultTheme}>
        <NavigationContainer theme={CombinedDefaultTheme}>
          <Navigator />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
