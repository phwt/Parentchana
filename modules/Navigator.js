import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import React from "react";
import { Ionicons } from "@expo/vector-icons";

import Menu from "../views/Menu";
import Settings from "../views/settings/Settings";
import Account from "../views/settings/Account";
import Pickup from "../views/pickup/Pickup";
import PickupRegister from "../views/pickup/PickupRegister";
import PickupList from "../views/pickup/PickupList";
import CheckIn from "../views/checkin/CheckIn";
import CheckInDetailed from "../views/checkin/CheckInDetailed";
import Calendar from "../views/calendar/Calendar";
import CalendarFavorite from "../views/calendar/CalendarFavorite";
import Login from "../views/Login";

const PickupNavigator = createBottomTabNavigator({
  Pickup: {
    screen: Pickup,
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <Ionicons name="ios-qr-scanner" size={24} color={tabInfo.tintColor} />
      ),
    },
  },
  // TODO: Hide for teacher
  PickupRegister: {
    screen: PickupRegister,
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <Ionicons name="md-person" size={24} color={tabInfo.tintColor} />
      ),
    },
  },
  // TODO: Hide for parent
  PickupList: {
    screen: PickupList,
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <Ionicons name="md-list" size={24} color={tabInfo.tintColor} />
      ),
    },
  },
});

const CheckInNavigator = createBottomTabNavigator({
  CheckIn: {
    screen: CheckIn,
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <Ionicons name="ios-calendar" size={24} color={tabInfo.tintColor} />
      ),
    },
  },
  CheckInDetailed: {
    screen: CheckInDetailed,
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <Ionicons name="md-list" size={24} color={tabInfo.tintColor} />
      ),
    },
  },
});

const CalendarNavigator = createBottomTabNavigator({
  Calendar: {
    screen: Calendar,
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <Ionicons name="ios-calendar" size={24} color={tabInfo.tintColor} />
      ),
    },
  },
  CalendarFavorite: {
    screen: CalendarFavorite,
    navigationOptions: {
      tabBarIcon: (tabInfo) => (
        <Ionicons name="md-list" size={24} color={tabInfo.tintColor} />
      ),
    },
  },
});

const Navigator = createStackNavigator({
  Menu,
  Settings,
  Account,
  Login,
  PickupNavigator,
  CheckInNavigator,
  CalendarNavigator,
});

export default createAppContainer(Navigator);
