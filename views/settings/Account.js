import React from "react";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import * as firebase from "firebase";

const Account = (props) => {
  const logout = async () => {
    try {
      await firebase.auth().signOut();
      alert("Signed Out");
      props.navigation.navigate("Menu");
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  return (
    <>
      <Text>Account</Text>
      <Button mode="contained" onPress={logout}>
        Logout
      </Button>
    </>
  );
};

export default Account;
