import React, { useState } from "react";
import { Button, Text, View, Switch, StyleSheet } from "react-native";

const Settings = (props) => {
  const [isLinkAccount, setisLinkAccount] = useState(true);
  const [isTimeCheckin, setTimeCheckin] = useState(false);
  const [isCalendar, setCalendar] = useState(false);
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Account</Text>

      <View style={styles.container}>
        <Text>
          Link to account
          </Text>
        <Switch
          value={isLinkAccount}
          onValueChange={value => setisLinkAccount(value)}
          trackColor={{ true: "#88c943", false: "#ff3b21" }}
          thumbColor="white"
        />
      </View>

      <Text style={styles.title}>Notification</Text>

      <View style={styles.container}>
        <Text>
          Time Check-in (arrival, absent, departure)
        </Text>
        <Switch
          value={isTimeCheckin}
          onValueChange={value => setTimeCheckin(value)}
          trackColor={{ true: "#88c943", false: "#ff3b21" }}
          thumbColor="white"
        />
      </View>

      <View style={styles.container}>
        <Text>
          Calendar (event)
        </Text>
        <Switch
          value={isCalendar}
          onValueChange={value => setCalendar(value)}
          trackColor={{ true: "#88c943", false: "#ff3b21" }}
          thumbColor="white"
        />
      </View>
    <View style={styles.button}>
      <Button
        title="Account"
        onPress={() => props.navigation.navigate("Account")}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: "5%",
    backgroundColor: "#e7eaef",
    // alignItems: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 5,
    backgroundColor: "#ffffff",
    padding: 10
  },
  title: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: "bold",
    marginVertical: 5,
  },
  button: {
    marginVertical: 20,
    paddingRight: "50%"
  }
});

export default Settings;
