import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const MenuCard = (props) => {
  return (
    <View style={{ zIndex: props.z }}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          ...styles.card,
          backgroundColor: props.disabled ? props.bgdis : props.bgcolor,
        }}
        onPress={() => {
          props.onSelect();
        }}
        disabled={props.disabled}
      >
        <Text style={styles.heading}>{props.heading}</Text>
        <Text style={styles.title}>{props.title}</Text>
        {/*<Text style={styles.description}>{props.description}</Text>*/}
        <Image style={styles.bgimg} source={props.bgimg} />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: props.disabled ? props.bgdis : props.bgcolor,
          position: "absolute",
          height: 50,
          width: 50,
          top: -50,
        }}
      />
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
    borderBottomLeftRadius: 50,
  },
});

export default MenuCard;
