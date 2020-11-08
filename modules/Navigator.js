import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";

import Menu from "../views/Menu";
import Settings from "../views/settings/Settings";
import Account from "../views/settings/Account";
import Login from "../views/Login";
import Pickup from "../views/pickup/Pickup";
import PickupRegister from "../views/pickup/PickupRegister";
import PickupList from "../views/pickup/PickupList";
import CheckIn from "../views/checkin/CheckIn";
import CheckInDetailed from "../views/checkin/CheckInDetailed";
import Calendar from "../views/calendar/Calendar";
import CalendarFavorite from "../views/calendar/CalendarFavorite";

const PickupTab = createBottomTabNavigator();
const PickupTabs = () => (
  <PickupTab.Navigator>
    <PickupTab.Screen
      name="Pickup"
      component={Pickup}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-qr-scanner" size={24} color={color} />
        ),
      }}
    />
    <PickupTab.Screen
      name="PickupRegister"
      component={PickupRegister}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="md-person" size={24} color={color} />
        ),
      }}
    />
    <PickupTab.Screen
      name="PickupList"
      component={PickupList}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="md-list" size={24} color={color} />
        ),
      }}
    />
  </PickupTab.Navigator>
);

const CheckInTab = createBottomTabNavigator();
const CheckInTabs = () => (
  <CheckInTab.Navigator>
    <CheckInTab.Screen
      name="CheckIn"
      component={CheckIn}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-calendar" size={24} color={color} />
        ),
      }}
    />
    <CheckInTab.Screen
      name="CheckInDetailed"
      component={CheckInDetailed}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="md-list" size={24} color={color} />
        ),
      }}
    />
  </CheckInTab.Navigator>
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
        tabBarIcon: ({ color }) => (
          <Ionicons name="md-list" size={24} color={color} />
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
    <Stack.Screen name="CheckIn" component={CheckInTabs} />
    <Stack.Screen name="Calendar" component={CalendarTabs} />
  </Stack.Navigator>
);
