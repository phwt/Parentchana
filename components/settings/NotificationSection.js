import React from "react";
import { Divider, List } from "react-native-paper";
import NotificationCalendarItem from "./NotificationCalendarItem";
import NotificationCheckinItem from "./NotificationCheckinItem";
import { useSelector } from "react-redux";

const NotificationSection = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      <List.Section>
        <List.Subheader>Notification</List.Subheader>
        {role === 1 && (
          <>
            <Divider />
            <NotificationCheckinItem />
          </>
        )}
        <Divider />
        <NotificationCalendarItem />
        <Divider />
      </List.Section>
    </>
  );
};

export default NotificationSection;
