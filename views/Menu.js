import React from "react";
import { View, Text, Button } from "react-native";
import MenuCard from "../components/menu/MenuCard";

const Menu = (props) => {
  return (
    <View>
      <Text>Main Menu</Text>
      <Button
        title="Account"
        onPress={() => props.navigation.navigate("Account")}
      />
      <Button
        title="Settings"
        onPress={() => props.navigation.navigate("Settings")}
      />
      <MenuCard title="Pick Up" onSelect={() => props.navigation.navigate("Pickup")}/>
      <MenuCard title="Check In" onSelect={() => props.navigation.navigate("CheckIn")}/>
      <MenuCard title="Calendar" onSelect={() => props.navigation.navigate("Calendar")}/>
    </View>
  );
};

export default Menu;
