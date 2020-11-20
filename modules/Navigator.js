import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";

import Menu from "../views/Menu";
import Settings from "../views/settings/Settings";
import Account from "../views/settings/Account";
import Login from "../views/Login";
import Pickup from "../views/pickup/Pickup";
import PickupList from "../views/pickup/PickupList";
import CheckIn from "../views/checkin/CheckIn";
import Calendar from "../views/calendar/Calendar";
import CalendarFavorite from "../views/calendar/CalendarFavorite";

import { store } from "../store/index";

const PickupTabs = () => (
  <>
    {store.getState().auth.role === 1 && <Pickup />}
    {store.getState().auth.role === 2 && <PickupList />}
  </>
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
  <Stack.Navigator initialRouteName="Menu">
    <Stack.Screen name="Menu" component={Menu} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="Account" component={Account} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Pickup" component={PickupTabs} />
    <Stack.Screen name="CheckIn" component={CheckIn} />
    <Stack.Screen name="Calendar" component={CalendarTabs} />
  </Stack.Navigator>
);
