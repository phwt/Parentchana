import React from "react";
import { View, Text, Button } from "react-native";

const Menu = (props) => {
  return (
    <View>
      <Text>Main Menu</Text>
      <Button
        title="Pick Up"
        onPress={() => props.navigation.navigate("Pickup")}
      />
      <Button
        title="Check In"
        onPress={() => props.navigation.navigate("CheckIn")}
      />
      <Button
        title="Calendar"
        onPress={() => props.navigation.navigate("Calendar")}
      />
    </View>
  );
};

export default Menu;
