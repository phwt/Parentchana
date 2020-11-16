import React, { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import { FlatList, View } from "react-native";
import moment from "moment";
import { currentMonthDays } from "../../modules/CheckinUtils";

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

const CheckInRow = ({ item, checkinData }) => {
  const currentItem = checkinData[item];
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

const CheckInTable = (props) => {
  const [checkinData, setCheckinData] = useState([]);

  useEffect(() => {
    let checkinTable = currentMonthDays(props.selectedRange);
    console.log(currentMonthDays(props.selectedRange, [], "YYYY-MM-DD"));
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
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Arrival</DataTable.Title>
          <DataTable.Title>Departure</DataTable.Title>
        </DataTable.Header>
      </DataTable>

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
