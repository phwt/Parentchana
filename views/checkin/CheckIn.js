import React, { useState } from "react";
import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { useSelector } from "react-redux";
import { Row, Grid } from "react-native-easy-grid";
import CheckInTable from "../../components/checkin/CheckInTable";

const CheckIn = ({ navigation }) => {
  var APIBefore = [];
  var API = [];
  var checkFirstItem = true;
  var checkDateBefore = "";
  var checkTypeBefore = "";
  var checkOntimeBefore = Boolean;
  var startStatus = true;
  var change = Boolean;
  var checkinData = {};

  var date = "";
  var type = "";
  var ff = true;
  const [selectedRange, setSelectedRange] = useState(
    moment(new Date("11/01/2020"))
  );

  const checkinList = useSelector((state) => state.checkin.list);

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
                <Text style={{ marginRight: 0, ...styles.textStyle }}>
                  {year}
                </Text>
              </View>
            );
          }}
        />
      </Row>
      <Row size={40}>
        <SafeAreaView style={styles.container}>
          <CheckInTable
            selectedRange={selectedRange}
            checkinList={checkinList}
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

export default CheckIn;
