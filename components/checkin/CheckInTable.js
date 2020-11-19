import React, { useEffect, useState } from "react";
import { Divider, List } from "react-native-paper";
import { FlatList, View, Text } from "react-native";
import moment from "moment";
import { currentMonthDays } from "../../modules/CheckinUtils";
import { Ionicons } from "@expo/vector-icons";

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

const CheckInRow = ({ item, checkinData }) => {
  const currentItem = checkinData[item];
  const title = moment(item).format("DD MMMM YYYY - dddd");
  return (
    <>
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

const CheckInTable = (props) => {
  const [checkinData, setCheckinData] = useState([]);

  useEffect(() => {
    let checkinTable = currentMonthDays(props.selectedRange);
    props.checkinList.map((el) => {
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
    setCheckinData(checkinTable);
  }, []);

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

export default CheckInTable;
