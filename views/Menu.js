import React from "react";
import { View, Text, Button } from "react-native";
import MenuCard from "../components/menu/MenuCard";

const Menu = (props) => {
  return (
    <View>
      <Button
        title="Account"
        onPress={() => props.navigation.navigate("Account")}
      />
      <Button
        title="Settings"
        onPress={() => props.navigation.navigate("Settings")}
      />
      <MenuCard
        title="Student Pickup"
        heading="Scan QR Code"
        description="Picking-up: 12345"
        bgcolor="#041743"
        onSelect={() => props.navigation.navigate("Pickup")}
      />
      <MenuCard
        title="Time Check-In"
        heading="Student arrival and departures"
        description="Check-in: 09.14 - Late"
        bgcolor="#043c7b"
        onSelect={() => props.navigation.navigate("CheckIn")}
      />
      <MenuCard
        title="Calendar"
        heading="School activities"
        description="Upcoming: Final Examination (21/09/20)"
        bgcolor="#209ccf"
        onSelect={() => props.navigation.navigate("Calendar")}
      />
    </View>
  );
};

export default Menu;
