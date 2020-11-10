import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { loadCheckinList } from "../../store/actions/checkinActions";

const CheckInDetailed = (props) => {
  const [selectedRange, setSelectedRange] = useState(new Date("01/11/2020")); // TODO: Handle month selection

  useEffect(() => {
    (async () => {
      await loadCheckinList();
    })();
  }, []);

  let checkinTable = {};
  props.checkinList.map((el) => {
    const dateKey = moment.unix(el.timestamp.seconds).startOf("day");
    const timestamp = moment.unix(el.timestamp.seconds).toDate();

    if (!(dateKey in checkinTable)) checkinTable[dateKey] = {};

    checkinTable[dateKey] = {
      ...checkinTable[dateKey],
      [el.type]: {
        timestamp: timestamp,
        ontime: el.ontime,
      },
    };
  });

  const ColorDot = ({ ontime }) => (
    <View
      style={{
        width: "10%",
        height: "50%",
        marginTop: "7%",
        marginRight: "5%",
        borderRadius: 50,
        backgroundColor: ontime ? "green" : "orange",
      }}
    />
  );

  const renderItem = ({ item }) => {
    const currentItem = checkinTable[item]
    return (
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.space}>
            <Text style={styles.data}>{item}</Text>
          </View>
          <View style={styles.space}>
            <ColorDot ontime={currentItem.arrival.ontime} />
            <Text style={styles.data}>
              {moment(currentItem.arrival.timestamp).format("HH:mm")}
            </Text>
          </View>
          <View style={styles.space}>
            <ColorDot ontime={currentItem.departure.ontime} />
            <Text style={styles.data}>
              {moment(currentItem.departure.timestamp).format("HH:mm")}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          margin: 10,
          flexDirection: "row",
        }}
      >
        <View style={styles.space}>
          <Text style={styles.title}>Date</Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.title}>Arrival</Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.title}>Departure</Text>
        </View>
      </View>

      <FlatList
        data={Object.keys(checkinTable)}
        renderItem={renderItem}
        keyExtractor={(item) => item}
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
    // justifyContent: "center",
    alignSelf: "center",
    margin: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    checkinList: state.checkin.list,
  };
};

export default connect(mapStateToProps)(CheckInDetailed);
