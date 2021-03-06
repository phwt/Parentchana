import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Platform } from "react-native";
import { store } from "../store/index";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const scheduleEventNotification = async (eventId) => {
  const state = store.getState();
  const event = state.calendar.events.find((event) => event.id === eventId);
  const triggerSeconds = moment(event.start.date, "YYYY-MM-DD").diff(
    moment(),
    "seconds"
  );
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: event.summary,
      body: event.summary,
      data: { type: "calendar", eventId },
    },
    trigger: { seconds: 10 }, // TODO: Use triggerSeconds on production
  });
};

export const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  await AsyncStorage.setItem("expoPushToken", token);
  return token;
};
