import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { checkinAPI } from "../../store/mockData";

const Item = ({ prop }) => {
  return (

    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',

    }}>
      <View style={styles.space}>
        <Text style={styles.data}>
          {prop.timestamp.getDate()}/{prop.timestamp.getMonth()}/{prop.timestamp.getFullYear()}
        </Text>
      </View>
      <View style={styles.space}>
        <Text style={styles.data}>
          {prop.studentId}
        </Text>
      </View>
      <View style={styles.space}>
        <Text style={styles.data}>
          {prop.timestamp.getHours().toString().length != 2
            ? "0" + prop.timestamp.getHours()
            : prop.timestamp.getHours()}
                  :
                  {prop.timestamp.getMinutes().toString().length != 2
            ? "0" + prop.timestamp.getMinutes()
            : prop.timestamp.getMinutes()}
        </Text>
      </View>
      {/* {prop.type == "arrival" ? setStatus("green") : prop.type == "departure" ? setStatus("orange") : setStatus("red")}
      <View style={styles.space}>
        <View style={{
          width: "12%",
          height: "50%",
          marginTop: "7%",
          marginRight: "5%",
          borderRadius: 100,
          backgroundColor: status
        }} />
        <Text style={styles.data}>
          {prop.type}
        </Text>
      </View> */}
      {prop.type == "arrival" ?
      <View style={styles.space}>
        <View style={{
          width: "12%",
          height: "50%",
          marginTop: "7%",
          marginRight: "5%",
          borderRadius: 100,
          backgroundColor: "green"
        }} />
        <Text style={styles.data}>
          {prop.type}
        </Text>
      </View> : prop.type == "departure" ?
        <View style={styles.space}>
          <View style={{
            width: "12%",
            height: "50%",
            marginTop: "7%",
            marginRight: "5%",
            borderRadius: 100,
            backgroundColor: "orange"
          }} />
          <Text style={styles.data}>
            {prop.type}
          </Text>
        </View> :
        <View style={styles.space}>
          <View style={{
            width: "12%",
            height: "50%",
            marginTop: "7%",
            marginRight: "5%",
            borderRadius: 100,
            backgroundColor: "red"
          }} />
          <Text style={styles.data}>
            {prop.type}
          </Text>
        </View>}
    </View>
  );
};

const CheckInDetailed = () => {
  let [checkinList, setcheckinList] = useState(checkinAPI);

  const renderItem = ({ item }) => (
    <View style={{
      marginHorizontal: 10,
      marginVertical: 5,
    }}>
      <Item prop={item} />
    </View>
  );

  return (

    <SafeAreaView style={styles.container}>
      <View style={{
        //  flex: 1,
        margin: 10,
        flexDirection: 'row',
      }}>
        <View style={styles.space}><Text style={styles.title}>Date</Text></View>
        <View style={styles.space}><Text style={styles.title}>ID</Text></View>
        <View style={styles.space}><Text style={styles.title}>Time</Text></View>
        <View style={styles.space}><Text style={styles.title}>Status</Text></View>
      </View>

      <FlatList
        data={checkinList}
        renderItem={renderItem}
        keyExtractor={item => item.timestamp.toString() + new Date()}
      // numColumns={3}
      />
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 25,
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
  },
  space: {
    width: "25%",
    flexDirection: "row",
  },
  data: {
    alignSelf: "center",
    margin: 0
  },
});

export default CheckInDetailed;
