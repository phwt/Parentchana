import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { checkinAPI } from "../../store/mockData";
import moment from "moment";

const Item = ({ prop }) => {
  let checkArrival = 0;
  let checkDeparture = 0;
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',

    }}>
      <View style={styles.space}>
        <Text style={styles.data}>
          {moment.unix(prop.timestamp.seconds).format("DD/MM/YYYY")}
        </Text>
      </View>

      <View style={styles.space}>
        <Text style={styles.data}>
          {prop.studentId}
        </Text>
      </View>

      {prop.type.map((itype, index) => {
        if (itype === "arrival") {
          checkArrival = 1;
          return <View style={styles.space}>
            <View style={{
              width: "12%",
              height: "50%",
              marginTop: "7%",
              marginRight: "5%",
              borderRadius: 100,
              backgroundColor: prop.ontime[index] == true ? "green" : "orange"
            }} />
            <Text style={styles.data}>
              {moment.unix(prop.timestamp.seconds).format("HH:MM")}
            </Text>
          </View>;
        }
      })}

      {checkArrival == 0 ?
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
            {moment.unix(prop.timestamp.seconds).format("HH:MM")}
          </Text>
        </View> : null
      }

      {prop.type.map((itype, index) => {
        if (itype === "departure") {
          checkDeparture = 1;
          return <View style={styles.space}>
            <View style={{
              width: "12%",
              height: "50%",
              marginTop: "7%",
              marginRight: "5%",
              borderRadius: 100,
              backgroundColor: prop.ontime[index] == true ? "green" : "orange"
            }} />
            <Text style={styles.data}>
              {moment.unix(prop.timestamp.seconds).format("HH:MM")}
            </Text>
          </View>;
        }
      })}

      {checkDeparture == 0 ?
        <View style={styles.space}>
          <Text style={styles.data}>
            -
        </Text>
        </View> : null
      }
    </View>
  );
};

const CheckInDetailed = () => {
  let [checkinList, setcheckinList] = useState(checkinAPI);
  const data = [];

  const dataconv = checkinList.map((item) => {
    return {
      ...item,
      type: [item.type],
      ontime: [item.ontime]
    }
  });


  for (let i of dataconv) {
    const studentId = i.studentId;
    const timestamp = moment.unix(i.timestamp.seconds).format("DD/MM/YYYY");
    let isSame = false;
    // console.log(i);
    for (let j of data) {
      if (j.studentId === studentId && moment.unix(j.timestamp.seconds).format("DD/MM/YYYY") === timestamp) {
        // merge
        j.type = [...i.type, ...j.type];
        j.ontime = [...i.ontime, ...j.ontime]
        isSame = true;
        break;
      }
    }
    if (!isSame) {
      data.push(i);

    }
  }
  // console.log(data);

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
        <View style={styles.space}><Text style={styles.title}>Arrival</Text></View>
        <View style={styles.space}><Text style={styles.title}>Departure</Text></View>
      </View>

      <FlatList
        data={data}
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
