import React, { useEffect } from "react";
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

import { store } from "./store/index";
import { Provider as ReduxProvider } from "react-redux";

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

import initializeFirebase from "./modules/Firebase";
import { registerForPushNotificationsAsync } from "./modules/LocalNotification";
initializeFirebase(store);

const App = () => {
  useEffect(() => {
    (async () => {
      await registerForPushNotificationsAsync();
    })();
  }, []);

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
