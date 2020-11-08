import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
// import { withOrientation } from "react-navigation";

const MenuCard = (props) => {
  return (
    <View style={{ opacity: props.disabled ? 0.25 : 1 }}>
      <TouchableOpacity
        style={{
          ...styles.card,
          backgroundColor: props.bgcolor,
        }}
        onPress={() => {
          props.onSelect();
        }}
        disabled={props.disabled}
      >
        <Text style={styles.heading}>{props.heading}</Text>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.description}>{props.description}</Text>
        <Image style={styles.bgimg} source={props.bgimg}></Image>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: "white",
  },
  heading: {
    fontSize: 20,
    color: "white",
    opacity: 0.6,
  },
  description: {
    color: "white",
    opacity: 0.6,
    position: "absolute",
    bottom: 20,
    left: 45,
  },
  bgimg: {
    position: "absolute",
    bottom: 30,
    right: 30,
    height: 120,
    width: 120,
    opacity: 0.1,
    zIndex: -1,
  },
  card: {
    paddingLeft: 45,
    paddingTop: 30,
    height: 180,
  },
});

export default MenuCard;
