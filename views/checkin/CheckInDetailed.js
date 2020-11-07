import React, { useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import { DataTable } from "react-native-paper";
import moment from "moment";
import { connect } from "react-redux";
import { loadCheckinList } from "../../store/actions/checkinActions";

const Item = ({ prop }) => {
  let checkArrival = 0;
  let checkDeparture = 0;
  return (
    // <DataTable.Row>
    //   <DataTable.Cell style={styles.data}>{moment.unix(prop.timestamp.seconds).format("DD/MM/YYYY")}</DataTable.Cell>
    //   <DataTable.Cell style={styles.data}>{prop.studentId}</DataTable.Cell>
    //   <DataTable.Cell style={styles.data} children={<View style={{
    //     width: "12%",
    //     height: "50%",
    //     borderRadius: 100,
    //     backgroundColor: "green"
    //   }} />}>
    //     {moment.unix(prop.timestamp.seconds).format("HH:MM")}
    //   </DataTable.Cell>

    //   <DataTable.Cell style={styles.data}>{moment.unix(prop.timestamp.seconds).format("HH:MM")}</DataTable.Cell>
    // </DataTable.Row>

    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={styles.space}>
        <Text style={styles.data}>
          {moment.unix(prop.timestamp.seconds).format("DD/MM/YYYY")}
        </Text>
      </View>

      <View style={styles.space}>
        <Text style={styles.data}>{prop.studentId}</Text>
      </View>

      {prop.type.map((itype, index) => {
        if (itype === "arrival") {
          checkArrival = 1;
          return (
            <View style={styles.space}>
              <View
                style={{
                  width: "10%",
                  height: "50%",
                  marginTop: "7%",
                  marginRight: "5%",
                  borderRadius: 50,
                  backgroundColor:
                    prop.ontime[index] == true ? "green" : "orange",
                }}
              />
              <Text style={styles.data}>
                {moment.unix(prop.timestamp.seconds).format("HH:MM")}
              </Text>
            </View>
          );
        }
      })}

      {checkArrival == 0 ? (
        <View style={styles.space}>
          <View
            style={{
              width: "10%",
              height: "50%",
              marginTop: "7%",
              marginRight: "5%",
              borderRadius: 50,
              backgroundColor: "red",
            }}
          />
          <Text style={styles.data}>
            {moment.unix(prop.timestamp.seconds).format("HH:MM")}
          </Text>
        </View>
      ) : null}

      {prop.type.map((itype, index) => {
        if (itype === "departure") {
          checkDeparture = 1;
          return (
            <View style={styles.space}>
              <View
                style={{
                  width: "10%",
                  height: "50%",
                  marginTop: "7%",
                  marginRight: "5%",
                  borderRadius: 50,
                  backgroundColor:
                    prop.ontime[index] == true ? "green" : "orange",
                }}
              />
              <Text style={styles.data}>
                {moment.unix(prop.timestamp.seconds).format("HH:MM")}
              </Text>
            </View>
          );
        }
      })}

      {checkDeparture == 0 ? (
        <View style={styles.space}>
          <Text style={styles.data}>-</Text>
        </View>
      ) : null}
    </View>
  );
};

const CheckInDetailed = (props) => {
  const data = [];

  useEffect(() => {
    (async () => {
      await loadCheckinList();
    })();
  }, []);

  const dataconv = props.checkinList.map((item) => {
    return {
      ...item,
      type: [item.type],
      ontime: [item.ontime],
    };
  });

  for (let i of dataconv) {
    const studentId = i.studentId;
    const timestamp = moment.unix(i.timestamp.seconds).format("DD/MM/YYYY");
    let isSame = false;
    for (let j of data) {
      if (
        j.studentId === studentId &&
        moment.unix(j.timestamp.seconds).format("DD/MM/YYYY") === timestamp
      ) {
        // merge
        j.type = [...i.type, ...j.type];
        j.ontime = [...i.ontime, ...j.ontime];
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
    <View
      style={{
        marginHorizontal: 10,
        marginVertical: 5,
      }}
    >
      <Item prop={item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          //  flex: 1,
          margin: 10,
          flexDirection: "row",
        }}
      >
        <View style={styles.space}>
          <Text style={styles.title}>Date</Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.title}>ID</Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.title}>Arrival</Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.title}>Departure</Text>
        </View>
      </View>

      {/* <DataTable>
        <DataTable.Header>
          <DataTable.Title sortDirection='descending' style={styles.data}> Date</DataTable.Title>
          <DataTable.Title sortDirection='descending' style={styles.data}>ID</DataTable.Title>
          <DataTable.Title sortDirection='descending' style={styles.data}>Arrival</DataTable.Title>
          <DataTable.Title sortDirection='descending' style={styles.data}>Departure</DataTable.Title>
        </DataTable.Header>
      </DataTable> */}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.timestamp.toString() + new Date()}
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
