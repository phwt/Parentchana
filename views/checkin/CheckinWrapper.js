import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import CheckIn from "./CheckIn";

const CheckInWrapper = ({ navigation }) => {
  const [resetting, setResetting] = useState(false);

  const refreshComponent = () => {
    setResetting(true);
    setTimeout(() => {
      setResetting(false);
    }, 500);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Time Check-in" subtitle="Showing 12345's info" />
        <Appbar.Action icon="refresh" onPress={refreshComponent} />
      </Appbar.Header>

      {!resetting && <CheckIn />}
    </>
  );
};

export default CheckInWrapper;
