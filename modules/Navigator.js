import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Menu from "../views/Menu";
import Settings from "../views/settings/Settings";
import Account from "../views/settings/Account";
import Pickup from "../views/pickup/Pickup";
import PickupRegister from "../views/pickup/PickupRegister";
import CheckIn from "../views/checkin/CheckIn";
import CheckInDetailed from "../views/checkin/CheckInDetailed";
import Calendar from "../views/calendar/Calendar";
import CalendarDetailed from "../views/calendar/CalendarDetailed";

const PickupNavigator = createBottomTabNavigator({
  Pickup,
  PickupRegister,
});
const CheckInNavigator = createBottomTabNavigator({
  CheckIn,
  CheckInDetailed,
});
const CalendarNavigator = createBottomTabNavigator({
  Calendar,
  CalendarDetailed,
});

const Navigator = createStackNavigator({
  Menu,
  Settings,
  Account,
  PickupNavigator,
  CheckInNavigator,
  CalendarNavigator,
});

export default createAppContainer(Navigator);
