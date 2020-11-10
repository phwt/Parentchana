import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { loadCheckinList } from "../../store/actions/checkinActions";
import { DataTable } from "react-native-paper";

const CheckInDetailed = (props) => {
  const [checkinData, setCheckinData] = useState([])
  const [selectedRange, setSelectedRange] = useState(new Date("01/11/2020")); // TODO: Handle month selection

  useEffect(() => {
    (async () => {
      await loadCheckinList();

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
      setCheckinData(checkinTable)
    })();
  }, []);

  const ColorDot = ({ ontime }) => (
    <View
      style={{
        width: 8,
        height: 8,
        borderRadius: 50,
        backgroundColor: ontime ? "green" : "orange",
      }}
    />
  );

  const renderItem = ({ item }) => {
    const currentItem = checkinData[item];
    return (
      <DataTable.Row>
        <DataTable.Cell>{moment(item).format("DD/MM/YY")}</DataTable.Cell>
        <DataTable.Cell>
          <ColorDot ontime={currentItem.arrival.ontime} />
          {moment(currentItem.arrival.timestamp).format("HH:mm")}
        </DataTable.Cell>
        <DataTable.Cell>
          <ColorDot ontime={currentItem.departure.ontime} />
          {moment(currentItem.departure.timestamp).format("HH:mm")}
        </DataTable.Cell>
      </DataTable.Row>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Arrival</DataTable.Title>
          <DataTable.Title>Departure</DataTable.Title>
        </DataTable.Header>
      </DataTable>

      <FlatList
        data={Object.keys(checkinData)}
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
