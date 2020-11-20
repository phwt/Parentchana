import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { Appbar, Button } from "react-native-paper";
import * as firebase from "firebase";
import { useSelector } from "react-redux";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
// import { Icon } from 'react-native-elements'

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

  const currentUser = useSelector((state) => state.profile);
  console.log(currentUser.phoneNumber);
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.navigation.popToTop();
          }}
        />
        <Appbar.Content title="Account" subtitle="Account info and settings" />
      </Appbar.Header>
      <Grid>
        <Row
          size={30}
          style={{ justifyContent: "center", backgroundColor: "white" }}
        >
          <View style={{ justifyContent: "flex-end" }}>
            <View>
              <Avatar.Image
                size={100}
                source={{
                  uri: "https://www.w3schools.com/howto/img_avatar.png",
                }}
              />
              {/* <Text>{currentUser.photoURL}</Text> */}
            </View>
          </View>
        </Row>

        <Row
          size={5}
          style={{
            justifyContent: "center",
            backgroundColor: "white",
            paddingBottom: 20,
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <View>
              <Text style={{ fontSize: 30 }}>{currentUser.displayName}</Text>
              <Text style={{ fontSize: 30 }}>Tummasorn T</Text>
            </View>
          </View>
        </Row>

        <Row
          size={5}
          style={{ justifyContent: "center", backgroundColor: "white" }}
        >
          <Col size={35} style={styles.colStyle}>
            <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
              <Icon name="md-mail" size={15} color="black" />
            </View>
          </Col>
          <Col size={60} style={{ ...styles.colStyle, marginLeft: 20 }}>
            <Text>
              {/* Email{"\n"} */}
              {currentUser.email}
            </Text>
          </Col>
        </Row>

        <Row
          size={5}
          style={{ justifyContent: "center", backgroundColor: "white" }}
        >
          <Col size={35} style={styles.colStyle}>
            <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
              <Icon name="md-call" size={15} color="black" />
            </View>
          </Col>
          <Col size={60} style={{ ...styles.colStyle, marginLeft: 20 }}>
            <Text>
              {/* Phone{"\n"} */}
              {currentUser.phoneNumber == null
                ? "08X-XXX-XXXX(null)"
                : currentUser.phoneNumber}
            </Text>
          </Col>
        </Row>

        <Row
          size={40}
          style={{ justifyContent: "center", backgroundColor: "white" }}
        >
          <View style={{ marginTop: 20 }}>
            <Button mode="contained" onPress={logout}>
              Logout
            </Button>
          </View>
        </Row>
      </Grid>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 25,
  },
  title: {
    fontWeight: "bold",
  },
  textStyle: {
    fontSize: 20,
    // fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    color: "black",
    paddingRight: 5,
  },
  colStyle: {
    justifyContent: "center",
  },
});

export default Account;
