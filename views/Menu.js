import React from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";
import MenuCard from "../components/menu/MenuCard";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Ionicons } from "@expo/vector-icons";

const Menu = (props) => {
  return (
    <View>
      <Grid>
        <Col>
          <Text>YO</Text>
        </Col>
        <Col>
          <Text>HA</Text>
        </Col>
      </Grid>
      {props.authenticated && (
        <TouchableOpacity onPress={() => props.navigation.navigate("Account")}>
          <Ionicons name="md-person" size={40} />
          <Text>Account</Text>
        </TouchableOpacity>
      )}
      {!props.authenticated && (
        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
          <Ionicons name="md-log-in" size={40} />
          <Text>Login</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => props.navigation.navigate("Settings")}>
        <Ionicons name="md-settings" size={40} />
        <Text>Settings</Text>
      </TouchableOpacity>
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
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    role: state.auth.role,
  };
};

export default connect(mapStateToProps)(Menu);
