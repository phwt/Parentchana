import React from "react";
import { Button } from "react-native";

const Settings = (props) => {
  return (
    <Button
      title="Account"
      onPress={() => props.navigation.navigate("Account")}
    />
  );
};

export default Settings;
