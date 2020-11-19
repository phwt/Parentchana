import { List } from "react-native-paper";
import React from "react";

const NotificationCheckinItem = () => {
  return (
    <List.Item
      title="Arrival / Departure Alert"
      description="Enabled"
      left={(props) => <List.Icon {...props} icon="timetable" />}
    />
  );
};

export default NotificationCheckinItem;
