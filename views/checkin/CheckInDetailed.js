import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { loadCheckinList } from "../../store/actions/checkinActions";
import CheckInTable from "../../components/checkin/CheckInTable";

const CheckInDetailed = (props) => {
  const [selectedRange, setSelectedRange] = useState(
    moment(new Date("11/01/2020"))
  ); // TODO: Handle month selection

  useEffect(() => {
    (async () => {
      await loadCheckinList();
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CheckInTable
        selectedRange={selectedRange}
        checkinList={props.checkinList}
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
