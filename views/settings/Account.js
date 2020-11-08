import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-paper";
import * as firebase from "firebase";
import { setAuthenticatedStatus } from "../../store/actions/authActions";

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

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = {
  setAuthenticatedStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
