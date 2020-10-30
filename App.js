import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Calendar from "./views/calendar/Calendar";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Test</Text>
      <StatusBar style="auto" />
      <Calendar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
