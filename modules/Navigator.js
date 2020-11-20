import React from "react";
import { Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";

import Menu from "../views/Menu";
import Settings from "../views/settings/Settings";
import Account from "../views/settings/Account";
import Login from "../views/Login";
import Pickup from "../views/pickup/Pickup";
import PickupList from "../views/pickup/PickupList";
import Calendar from "../views/calendar/Calendar";
import CalendarFavorite from "../views/calendar/CalendarFavorite";

import { store } from "../store/index";
import CheckInWrapper from "../views/checkin/CheckinWrapper";

const PickupStack = createStackNavigator();
const PickupTabs = () => (
  <PickupStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {store.getState().auth.role === 1 && (
      <PickupStack.Screen name="Pickup" component={Pickup} />
    )}
    {store.getState().auth.role === 2 && (
      <PickupStack.Screen name="PickupList" component={PickupList} />
    )}
  </PickupStack.Navigator>
);

const CalendarTab = createBottomTabNavigator();
const CalendarTabs = () => (
  <CalendarTab.Navigator>
    <CalendarTab.Screen
      name="Calendar"
      component={Calendar}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-calendar" size={24} color={color} />
        ),
      }}
    />
    <CalendarTab.Screen
      name="CalendarFavorite"
      component={CalendarFavorite}
      options={{
        title: "Event Notification",
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-notifications" size={24} color={color} />
        ),
      }}
    />
  </CalendarTab.Navigator>
);

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Menu"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Menu" component={Menu} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="Account" component={Account} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Pickup" component={PickupTabs} />
    <Stack.Screen
      name="CheckIn"
      component={CheckInWrapper}
      options={{
        headerRight: () => (
          <Button
            onPress={() => alert("This is a button!")}
            title="Info"
            color="#fff"
          />
        ),
      }}
    />
    <Stack.Screen name="Calendar" component={CalendarTabs} />
  </Stack.Navigator>
);
