import React from "react";
import { StyleSheet, View, Button, Text, TouchableOpacity } from "react-native";
import MenuCard from "../components/menu/MenuCard";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Ionicons } from "@expo/vector-icons";

const Menu = (props) => {
  return (
    <View>
      <View style={styles.topMenu}>
        <View style={styles.col}>
          {props.authenticated && (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Account")}
            >
              <Ionicons name="md-person" size={30} style={styles.topMenuIcon} />
              <Text style={styles.topMenuText}>Account</Text>
            </TouchableOpacity>
          )}
          {!props.authenticated && (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <Ionicons name="md-log-in" size={30} style={styles.topMenuIcon} />
              <Text style={styles.topMenuText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.col}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Settings")}
          >
            <Ionicons name="md-settings" size={30} style={styles.topMenuIcon} />
            <Text style={styles.topMenuText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <MenuCard
        title="Student Pickup"
        heading="Scan QR Code"
        description="Picking-up: 12345"
        bgimg={require("../assets/qr-code.png")}
        bgcolor="#041743"
        onSelect={() => props.navigation.navigate("Pickup")}
        disabled={!props.authenticated}
      />
      <MenuCard
        title="Time Check-In"
        heading="Student arrival and departures"
        description="Check-in: 09.14 - Late"
        bgimg={require("../assets/clock.png")}
        bgcolor="#043c7b"
        onSelect={() => props.navigation.navigate("CheckIn")}
        disabled={!props.authenticated || props.role !== 1}
      />
      <MenuCard
        title="Calendar"
        heading="School activities"
        description="Upcoming: Final Examination (21/09/20)"
        bgimg={require("../assets/calendar.png")}
        bgcolor="#209ccf"
        onSelect={() => props.navigation.navigate("Calendar")}
      />
      <View
        style={{
          backgroundColor: "#041743",
          position: "absolute",
          height: 100,
          width: 100,
        }}
      ></View>
      <View
        style={{
          backgroundColor: "#043c7b",
          position: "absolute",
          height: 100,
          width: 100,
          top: 200,
          zIndex: -1,
        }}
      ></View>
      <View
        style={{
          backgroundColor: "#209ccf",
          position: "absolute",
          height: 100,
          width: 100,
          top: 400,
          zIndex: -1,
        }}
      ></View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    role: state.auth.role,
  };
};

const styles = StyleSheet.create({
  col: {
    flex: 1,
    alignItems: "center",
  },
  topMenu: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 100,
    paddingTop: 30,
    paddingLeft: 50,
    paddingRight: 50,
    borderBottomLeftRadius: 50,
    zIndex: 1,
  },
  topMenuText: {
    fontSize: 10,
  },
  topMenuIcon: {
    paddingLeft: 5,
  },
});

export default connect(mapStateToProps)(Menu);
