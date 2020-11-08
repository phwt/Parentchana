import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import * as firebase from "firebase";
import { connect } from "react-redux";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      await firebase.auth().signInWithEmailAndPassword(email, password);
      alert("User signed in");
      props.navigation.navigate("Menu");
    } catch (error) {
      console.log(error);
      alert("User sign in error");
    }
  };

  return (
    <>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
        autoCompleteType="email"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
        textContentType="password"
        autoCompleteType="password"
      />
      <Button
        icon="login"
        mode="contained"
        onPress={login}
        disabled={email === "" || password === ""}
      >
        Login
      </Button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps)(Login);
