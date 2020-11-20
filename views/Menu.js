import React, { useEffect, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MenuCard from "../components/menu/MenuCard";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  fetchCalendarEvents,
  toggleCalendarFavorite,
} from "../store/actions/calendarActions";
import * as Notifications from "expo-notifications";
import { fetchStudents } from "../store/actions/pickupActions";
import initializeFirebase from "../modules/Firebase";
import { store } from "../store";

const Menu = (props) => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const role = useSelector((state) => state.auth.role);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(
    async (eventId) => {
      dispatch(toggleCalendarFavorite(eventId));
    },
    [dispatch]
  );

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        switch (notification.request.content.data.type) {
          case "calendar":
            toggleFavoriteHandler(notification.request.content.data.eventId);
            break;
        }
      }
    );
    return () => subscription.remove();
  }, []);

  const loadStudents = useCallback(async () => {
    try {
      await dispatch(fetchStudents());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await initializeFirebase(store);
      await loadStudents();
    })();
  }, []);

  return (
    <View>
      <View style={styles.topMenu}>
        <View style={styles.col}>
          {authenticated && (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Account")}
            >
              <Ionicons name="md-person" size={30} style={styles.topMenuIcon} />
              <Text style={styles.topMenuText}>Account</Text>
            </TouchableOpacity>
          )}
          {!authenticated && (
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
        bgdis="#b7bcc6"
        z={1}
        onSelect={() => props.navigation.navigate("Pickup")}
        disabled={!authenticated}
      />
      <MenuCard
        title="Time Check-In"
        heading="Student arrival and departures"
        description="Check-in: 09.14 - Late"
        bgimg={require("../assets/clock.png")}
        bgcolor="#043c7b"
        bgdis="#b7c5d4"
        z={0}
        onSelect={() => props.navigation.navigate("CheckIn")}
        disabled={!authenticated || role !== 1}
      />
      <MenuCard
        title="Calendar"
        heading="School activities"
        description="Upcoming: Final Examination (21/09/20)"
        bgimg={require("../assets/calendar.png")}
        bgcolor="#209ccf"
        bgdis="#209ccf"
        z={-1}
        onSelect={() => props.navigation.navigate("Calendar")}
      />
      {/* <View
        style={{
          backgroundColor: "#041743",
          position: "absolute",
          height: 100,
          width: 100,
        }}
      />
      <View
        style={{
          backgroundColor: "#043c7b",
          position: "absolute",
          height: 100,
          width: 100,
          top: 200,
          zIndex: -1,
        }}
      />
      <View
        style={{
          backgroundColor: "#209ccf",
          position: "absolute",
          height: 100,
          width: 100,
          top: 400,
          zIndex: -1,
        }}
      /> */}
    </View>
  );
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
    zIndex: 2,
  },
  topMenuText: {
    fontSize: 10,
  },
  topMenuIcon: {
    paddingLeft: 5,
  },
});

export default Menu;
