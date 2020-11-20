import React from "react";
import { Appbar } from "react-native-paper";
import CheckIn from "./CheckIn";

const CheckInWrapper = ({ navigation }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Time Check-in" subtitle="Showing 12345's info" />
        <Appbar.Action icon="refresh" />
      </Appbar.Header>

      <CheckIn />
    </>
  );
};

export default CheckInWrapper;
