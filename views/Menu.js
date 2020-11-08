import React from "react";
import { View, Button } from "react-native";
import MenuCard from "../components/menu/MenuCard";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-native-easy-grid";

const Menu = (props) => {
  return (
    <View>
      {props.authenticated && (
        <Button
          title="Account"
          onPress={() => props.navigation.navigate("Account")}
        />
      )}
      {!props.authenticated && (
        <Button
          title="Login"
          onPress={() => props.navigation.navigate("Login")}
        />
      )}
      <Button
        title="Settings"
        onPress={() => props.navigation.navigate("Settings")}
      />
      <MenuCard
        title="Student Pickup"
        heading="Scan QR Code"
        description="Picking-up: 12345"
        bgimg={require("../assets/qr-code.png")}
        bgcolor="#041743"
        onSelect={() => props.navigation.navigate("Pickup")}
      />
      <MenuCard
        title="Time Check-In"
        heading="Student arrival and departures"
        description="Check-in: 09.14 - Late"
        bgimg={require("../assets/clock.png")}
        bgcolor="#043c7b"
        onSelect={() => props.navigation.navigate("CheckIn")}
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
  };
};

export default connect(mapStateToProps)(Menu);
