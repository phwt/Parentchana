import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import { CalendarList, Calendar } from "react-native-calendars";
import moment from "moment";
import { connect } from "react-redux";
import { loadCheckinList } from "../../store/actions/checkinActions";
import { Row, Grid } from "react-native-easy-grid";
import { DataTable } from "react-native-paper";

const CheckIn = ({ checkinList, navigation }) => {
  var APIBefore = [];
  var API = [];
  var checkFirstItem = true;
  var checkDateBefore = "";
  var checkTypeBefore = "";
  var checkOntimeBefore = Boolean;
  var startStatus = true;
  var change = Boolean;
  var checkinData = {};
  const [checkinData2, setCheckinData2] = useState([]);

  var date = "";
  var type = "";
  var ff = true;
  const [selectedRange, setSelectedRange] = useState(
    moment(new Date("11/01/2020"))
  );
  
  useEffect(() => {
    (async () => {
      await loadCheckinList();
    })();
  }, []);

  const currentMonthDays = () => {
    const days = {};
    const dateStart = selectedRange.startOf("month");
    let dateEnd;

    if (selectedRange.startOf("month").diff(moment().startOf("month")) === 0) {
      // Current month
      dateEnd = dateStart.clone().add(moment().diff(dateStart, "days"), "days");
    } else {
      // Past Month
      dateEnd = dateStart.clone().endOf("month");
    }

    while (dateEnd.diff(dateStart, "days") >= 0) {
      days[dateStart.clone()] = {};
      dateStart.add(1, "days");
    }
    return days;
  };

  useEffect(() => {
    (async () => {
      await loadCheckinList();

      let checkinTable = currentMonthDays();
      checkinList.map((el) => {
        const dateKey = moment.unix(el.timestamp.seconds).startOf("day");
        const timestamp = moment.unix(el.timestamp.seconds).toDate();
        // console.log(checkinTable);
        checkinTable[dateKey] = {
          ...checkinTable[dateKey],
          [el.type]: {
            timestamp: timestamp,
            ontime: el.ontime,
          },
        };
      });
      setCheckinData2(checkinTable);
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

  // const [checkinList, setcheckinList] = useState(checkinAPI);
  
  for (var i = 0; i < Object.keys(checkinList).length; i++) {
    // delete object type departure from Data
    if (checkinList[i].type !== "departure") {
      APIBefore.push(checkinList[i]);
    }
  }
  for (var i = 0; i < APIBefore.length; i++) {
    // check after type == absent
    if (ff == true) {
      API.push(APIBefore[i]);
      type = APIBefore[i].type;
      date = moment.unix(APIBefore[i].timestamp.seconds).format("YYYYMMDD");
      ff = false;
      // console.log(moment.unix(APIBefore[i].timestamp.seconds).format("YYYYMMDD"), APIBefore[i].type);
    } else if (
      moment.unix(APIBefore[i].timestamp.seconds).format("YYYYMMDD") == date &&
      type == "absent" &&
      APIBefore[i].type == "arrival"
    ) {
      API.pop();
      API.push(APIBefore[i]);
      type = APIBefore[i].type;
      date = moment.unix(APIBefore[i].timestamp.seconds).format("YYYYMMDD");

      // console.log(moment.unix(APIBefore[i].timestamp.seconds).format("YYYYMMDD"), APIBefore[i].type);
    } else {
      API.push(APIBefore[i]);
      type = APIBefore[i].type;
      date = moment.unix(APIBefore[i].timestamp.seconds).format("YYYYMMDD");
      // console.log(type);
      // console.log(date);
      // console.log(moment.unix(APIBefore[i].timestamp.seconds).format("YYYYMMDD"), APIBefore[i].type);
    }
    // console.log("--------------------------------------");
  }
  // console.log(API);
  for (var i = 0; i < API.length; i++) {
    // console.log(Number(moment.unix(API[i].timestamp.seconds).format("YYYYMMDD")) - 1 == Number("20201103"));
    // console.log(moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD"));
    // console.log(API[i].type);
    // console.log(API[i].ontime);
    // console.log(API);
    // console.log("-------------------------------------");
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    if (API[i].type === "arrival") {
      if (API[i].ontime) {
        if (checkFirstItem == true) {
          checkinData[
            moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
          ] = {
            textColor: "white",
            startingDay: true,
            endingDay: true,
            color: "#249d3c",
          };
          checkDateBefore = moment
            .unix(API[i].timestamp.seconds)
            .format("YYYYMMDD");
          checkTypeBefore = "arrival";
          checkFirstItem = false;
          checkOntimeBefore = API[i].ontime;
        } else if (
          moment.unix(API[i].timestamp.seconds).format("YYYYMMDD") - 1 ==
          Number(checkDateBefore) &&
          checkTypeBefore == API[i].type &&
          checkOntimeBefore == API[i].ontime
        ) {
          checkinData[
            moment.unix(API[i - 1].timestamp.seconds).format("YYYY-MM-DD")
          ] = {
            textColor: "white",
            startingDay: startStatus,
            endingDay: false,
            color: "#249d3c",
          };
          checkinData[
            moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
          ] = {
            textColor: "white",
            startingDay: false,
            endingDay: true,
            color: "#249d3c",
          };
          checkDateBefore = moment
            .unix(API[i].timestamp.seconds)
            .format("YYYYMMDD");
          checkTypeBefore = "arrival";
          checkOntimeBefore = API[i].ontime;
          startStatus = false;
        } else {
          checkinData[
            moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
          ] = {
            textColor: "white",
            startingDay: true,
            endingDay: true,
            color: "#249d3c",
          };
          checkDateBefore = moment
            .unix(API[i].timestamp.seconds)
            .format("YYYYMMDD");
          checkTypeBefore = "arrival";
          startStatus = true;
          checkOntimeBefore = API[i].ontime;
        }
      } else {
        // console.log("-------------------------------------");
        // console.log(checkTypeBefore, API[i].type);
        // console.log(checkOntimeBefore, API[i].ontime);
        if (checkFirstItem == true) {
          checkinData[
            moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
          ] = {
            textColor: "white",
            startingDay: true,
            endingDay: true,
            color: "#ff9a00",
          };
          checkDateBefore = moment
            .unix(API[i].timestamp.seconds)
            .format("YYYYMMDD");
          checkTypeBefore = "arrival";
          checkFirstItem = false;
          checkOntimeBefore = API[i].ontime;
        } else if (
          moment.unix(API[i].timestamp.seconds).format("YYYYMMDD") - 1 ==
          Number(checkDateBefore) &&
          checkTypeBefore == API[i].type &&
          checkOntimeBefore == API[i].ontime
        ) {
          checkinData[
            moment.unix(API[i - 1].timestamp.seconds).format("YYYY-MM-DD")
          ] = {
            textColor: "white",
            startingDay: startStatus,
            endingDay: false,
            color: "#ff9a00",
          };
          checkinData[
            moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
          ] = {
            textColor: "white",
            startingDay: false,
            endingDay: true,
            color: "#ff9a00",
          };
          checkDateBefore = moment
            .unix(API[i].timestamp.seconds)
            .format("YYYYMMDD");
          checkTypeBefore = "arrival";
          checkOntimeBefore = API[i].ontime;
          startStatus = false;
        } else {
          checkinData[
            moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
          ] = {
            textColor: "white",
            startingDay: true,
            endingDay: true,
            color: "#ff9a00",
          };
          checkDateBefore = moment
            .unix(API[i].timestamp.seconds)
            .format("YYYYMMDD");
          checkTypeBefore = "arrival";
          startStatus = true;
          checkOntimeBefore = API[i].ontime;
        }
      }
    }
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    else if (API[i].type === "absent") {
      if (checkFirstItem == true) {
        checkinData[
          moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
        ] = {
          textColor: "white",
          startingDay: true,
          endingDay: true,
          color: "#d72f3c",
        };
        checkDateBefore = moment
          .unix(API[i].timestamp.seconds)
          .format("YYYY-MM-DD");
        checkTypeBefore = "absent";
        checkFirstItem = false;
        checkOntimeBefore = API[i].ontime;
      } else if (
        moment.unix(API[i].timestamp.seconds).format("YYYYMMDD") - 1 ==
        Number(checkDateBefore) &&
        checkTypeBefore == API[i].type &&
        checkOntimeBefore == API[i].ontime
      ) {
        checkinData[
          moment.unix(API[i - 1].timestamp.seconds).format("YYYY-MM-DD")
        ] = {
          textColor: "white",
          startingDay: startStatus,
          endingDay: false,
          color: "#d72f3c",
        };
        checkinData[
          moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
        ] = {
          textColor: "white",
          startingDay: false,
          endingDay: true,
          color: "#d72f3c",
        };
        checkDateBefore = moment
          .unix(API[i].timestamp.seconds)
          .format("YYYYMMDD");
        checkTypeBefore = "absent";
        checkOntimeBefore = API[i].ontime;
        startStatus = false;
      } else {
        checkinData[
          moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
        ] = {
          textColor: "white",
          startingDay: true,
          endingDay: true,
          color: "#d72f3c",
        };
        checkDateBefore = moment
          .unix(API[i].timestamp.seconds)
          .format("YYYYMMDD");
        checkTypeBefore = "absent";
        startStatus = true;
        checkOntimeBefore = API[i].ontime;
      }
    }
  }
  // console.log(checkinData);
  const renderItem = ({ item }) => {
    const currentItem = checkinData2[item];
    console.log(currentItem);
    return (
      <DataTable.Row>
        <DataTable.Cell>{moment(item).format("DD/MM/YY")}</DataTable.Cell>
        {currentItem.arrival !== undefined &&
          currentItem.departure !== undefined && (
            <>
              <DataTable.Cell>
                <ColorDot ontime={currentItem.arrival.ontime} />
                {moment(currentItem.arrival.timestamp).format("HH:mm")}
              </DataTable.Cell>
              <DataTable.Cell>
                <ColorDot ontime={currentItem.departure.ontime} />
                {moment(currentItem.departure.timestamp).format("HH:mm")}
              </DataTable.Cell>
            </>
          )}
        {currentItem.arrival === undefined &&
          currentItem.departure === undefined && (
            <>
              <DataTable.Cell>Absent</DataTable.Cell>
              <DataTable.Cell>Absent</DataTable.Cell>
            </>
          )}
      </DataTable.Row>
    );
  };

  return (
    <Grid>
      <Row size={60}>
        <Calendar
          // testID={testIDs.calendarList.CONTAINER}
          // markedDates={{
          //   '2020-11-02': {disabled: true, startingDay: true, endingDay: true, color: 'green'},
          //   '2020-11-17': {disabled: true, startingDay: true, endingDay: true, color: 'green'},
          //   '2020-11-25': {disabled: true, startingDay: true, endingDay: true, color: 'green'}

          // }}
          // horizontal={true}

          // pagingEnabled={true}
          markedDates={checkinData}
          markingType={"period"}
          current={moment().utcOffset("+05:30").format("YYYY-MM-DD")}
          // pastScrollRange={24}
          // futureScrollRange={24}
          onDayPress={() => {
            navigation.navigate("CheckInDetailed");
          }}
          renderHeader={(date) => {
            const header = date.toString("MMMM yyyy");
            const [month, year] = header.split(" ");

            return (
              <View
                style={{
                  flexDirection: "row",
                  width: "78%",
                  justifyContent: "center",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ marginLeft: 75, ...styles.textStyle }}
                >{`${month}`}</Text>
                <Text style={{ marginRight: 0, ...styles.textStyle }}>{year}</Text>
              </View>
            );
          }}
        />
      </Row>
      <Row size={40}>
        <SafeAreaView style={styles.container}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title>Arrival</DataTable.Title>
              <DataTable.Title>Departure</DataTable.Title>
            </DataTable.Header>
          </DataTable>

          <FlatList
          data={Object.keys(checkinData2)}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          />
        </SafeAreaView>
      </Row>
    </Grid>

    // theme={{
    //   'stylesheet.calendar.header': {
    //     dayHeader: {
    //       fontWeight: '600',
    //       color: 'black'
    //     }
    //   },
    //   'stylesheet.day.basic': {
    //     today: {
    //       borderColor: '#48BFE3',
    //       borderWidth: 0.8
    //     },
    //     todayText: {
    //       color: '#5390D9',
    //       fontWeight: '800'
    //     }
    //   }
    // }}
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
});

const mapStateToProps = (state) => {
  return { checkinList: state.checkin.list };
};

export default connect(mapStateToProps)(CheckIn);
