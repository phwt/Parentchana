import React, { useState } from "react";
import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { useSelector } from "react-redux";
import { Row, Grid } from "react-native-easy-grid";
import CheckInTable from "../../components/checkin/CheckInTable";
import { computeMarkedDates } from "../../modules/CheckinUtils";

const CheckIn = ({ navigation }) => {
  const [selectedRange, setSelectedRange] = useState(
    moment(new Date("11/01/2020"))
  );

  const checkinList = useSelector((state) => state.checkin.list);

  return (
    <Grid>
      <Row size={60}>
        <Calendar
          markedDates={computeMarkedDates(checkinList)}
          markingType={"period"}
          current={moment().utcOffset("+05:30").format("YYYY-MM-DD")}
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
