import React, { useEffect, useState } from "react";
import { Divider, List } from "react-native-paper";
import { FlatList, Text } from "react-native";
import moment from "moment";
import { currentMonthDays } from "../../modules/CheckinUtils";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

const StatusItem = ({ checkinItem, icon }) => {
  return (
    <Text style={{ color: "gray" }}>
      {checkinItem ? (
        <>
          <Ionicons
            name={icon}
            size={16}
            color={checkinItem.ontime ? "green" : "orange"}
          />{" "}
          {moment(checkinItem.timestamp).format("HH:mm")}
        </>
      ) : (
        <>
          <Ionicons name={icon} size={16} color="gray" />
          {" No Data"}
        </>
      )}
    </Text>
  );
};

StatusItem.propTypes = {
  checkinItem: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
  icon: PropTypes.string.isRequired,
};

const CheckInRow = ({ item, checkinData }) => {
  const currentItem = checkinData[item];
  const title = moment(item).format("DD MMMM YYYY - dddd");
  const weekOfMonth =
    moment(item).weeks() -
    moment(item).add(0, "month").startOf("month").weeks() +
    1;
  return (
    <>
      {(moment(item).date() === 1 || moment(item).day() === 1) && (
        <List.Subheader>Week {weekOfMonth}</List.Subheader>
      )}
      {currentItem.arrival !== undefined && (
        <List.Item
          title={title}
          description={() => {
            return (
              <>
                <StatusItem
                  checkinItem={currentItem.arrival}
                  icon="md-log-in"
                />
                {currentItem.departure !== undefined ? (
                  <StatusItem
                    checkinItem={currentItem.departure}
                    icon="md-log-out"
                  />
                ) : (
                  <StatusItem checkinItem={false} icon="md-log-out" />
                )}
              </>
            );
          }}
          left={(props) => (
            <List.Icon
              {...props}
              icon="circle"
              color={
                currentItem.arrival.ontime &&
                (currentItem.departure ? currentItem.departure.ontime : true)
                  ? "green"
                  : "orange"
              }
            />
          )}
        />
      )}
      {currentItem.arrival === undefined &&
        currentItem.departure === undefined && (
          <List.Item
            title={title}
            description="Absent"
            left={(props) => (
              <List.Icon {...props} icon="circle" color="#F75B53" />
            )}
          />
        )}
      <Divider />
    </>
  );
};

CheckInRow.propTypes = {
  item: PropTypes.string.isRequired,
  checkinData: PropTypes.object.isRequired,
};

const CheckInTable = ({ checkinList, selectedRange }) => {
  const [checkinData, setCheckinData] = useState({});

  useEffect(() => {
    let checkinTable = currentMonthDays({
      toDate: selectedRange,
      weekdayOnly: true,
    });
    const filteredList = checkinList.filter((checkinItem) => {
      return (
        moment.unix(checkinItem.timestamp.seconds).format("MM/YY") ===
        selectedRange.clone().subtract(1, "months").format("MM/YY")
      );
    });
    filteredList.map((el) => {
      const dateKey = moment.unix(el.timestamp.seconds).startOf("day");
      const timestamp = moment.unix(el.timestamp.seconds).toDate();
      checkinTable[dateKey] = {
        ...checkinTable[dateKey],
        [el.type]: {
          timestamp: timestamp,
          ontime: el.ontime,
        },
      };
    });

    const filteredFutureDates = Object.keys(checkinTable)
      .filter((key) => moment(key).isBefore(moment(), "day"))
      .reduce((obj, key) => {
        obj[key] = checkinTable[key];
        return obj;
      }, {});

    setCheckinData(filteredFutureDates);
  }, [checkinList, selectedRange]);

  return (
    <>
      <FlatList
        data={Object.keys(checkinData)}
        renderItem={({ item }) => (
          <CheckInRow item={item} checkinData={checkinData} />
        )}
        keyExtractor={(item) => item}
      />
    </>
  );
};

CheckInTable.propTypes = {
  checkinList: PropTypes.array.isRequired,
  selectedRange: PropTypes.object.isRequired,
};

export default CheckInTable;
