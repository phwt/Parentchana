import React from "react";
import { Divider, List } from "react-native-paper";
import NotificationCalendarItem from "./NotificationCalendarItem";
import NotificationCheckinItem from "./NotificationCheckinItem";

const NotificationSection = () => {
  return (
    <>
      <List.Section>
        <List.Subheader>Notification</List.Subheader>
        <Divider />
        <NotificationCheckinItem />
        <Divider />
        <NotificationCalendarItem />
        <Divider />
      </List.Section>
    </>
  );
};

export default NotificationSection;
