import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, StatusBar } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useSelector } from "react-redux";
import { insertPickupStudent } from "../../modules/Firebase";
import { Appbar } from "react-native-paper";
import Color from "../../modules/Color";
import { Ionicons } from "@expo/vector-icons";

const Pickup = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanData, setScanData] = useState({});

  const registeredPlate = useSelector((state) => state.profile.pickupPlate);
  const registeredStudents = useSelector(
    (state) => state.profile.pickupStudents
  );

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScanData({ type, data });
    try {
      await insertPickupStudent(registeredPlate, registeredStudents);
    } catch (error) {
      console.log(error);
      alert("Insert Student Error");
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centerXY}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.centerXY}>
        <Text>Need access to camera</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Appbar.Header style={{ backgroundColor: Color.pickupKey }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Student Pickup" subtitle="Scan for pickup" />
        <Appbar.Action
          icon="settings"
          onPress={() => {
            navigation.navigate("Settings");
          }}
        />
      </Appbar.Header>
      <Grid>
        <Row size={75}>
          {!scanned && (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          )}
          {scanned && (
            <View
              style={{
                backgroundColor: "#f1f1f1",
                ...styles.centerXY,
              }}
            >
              <Ionicons name="md-checkmark-circle" size={140} color="#28a745" />
              <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                Scan Success
              </Text>
              <Text
                style={{ color: "grey", textAlign: "center", paddingTop: 10 }}
              >{`Type: ${scanData.type}\nData: ${scanData.data}`}</Text>
            </View>
          )}
        </Row>
        <Row size={25}>
          <View style={styles.centerXY}>
            <Button
              title={"Simulate Send"}
              onPress={() =>
                handleBarCodeScanned({ type: "Simulate", data: "No Data" })
              }
            />
            {!scanned && <Text>Scan QR code at school entrance</Text>}
            {scanned && (
              <Button title={"Scan Again"} onPress={() => setScanned(false)} />
            )}
          </View>
        </Row>
      </Grid>
    </>
  );
};

const styles = StyleSheet.create({
  centerXY: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default Pickup;
