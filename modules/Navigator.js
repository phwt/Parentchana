import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Menu from "../views/Menu";
import Pickup from "../views/pickup/Pickup";
import CheckIn from "../views/checkin/CheckIn";
import Calendar from "../views/calendar/Calendar";

const Navigator = createStackNavigator({
  Menu,
  Pickup,
  CheckIn,
  Calendar,
});

export default createAppContainer(Navigator);
