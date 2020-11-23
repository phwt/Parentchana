import React, { useState } from "react";
import { TextInput, Button, Appbar } from "react-native-paper";
import * as firebase from "firebase";
import { StatusBar, StyleSheet, View } from "react-native";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
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
      <StatusBar barStyle="light-content" />
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.navigation.popToTop();
          }}
        />
        <Appbar.Content
          title="Login"
          subtitle="Login to parent or teacher account"
        />
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput
          style={styles.pb}
          label="Email"
          value={email}
          onChangeText={setEmail}
          textContentType="emailAddress"
          autoCompleteType="email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.pb}
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
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    paddingLeft: 20,
    paddingRight: 20,
  },
  pb: {
    marginBottom: 20,
  },
});

export default Login;
