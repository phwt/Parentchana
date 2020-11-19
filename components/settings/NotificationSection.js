import React, { useState } from "react";
import { Divider, List } from "react-native-paper";
import moment from "moment";

const EventNotificationItem = (props) => {
  return (
    <List.Item
      title={props.choice.title}
      left={(iconProps) => (
        <List.Icon
          {...iconProps}
          icon={
            props.calendarSelection === props.choice.duration
              ? "check"
              : "blank"
          }
          color={
            props.calendarSelection === props.choice.duration
              ? props.color
              : "#F0F0F0"
          }
        />
      )}
      onPress={() => props.setCalendarSelection(props.choice.duration)}
    />
  );
};

const NotificationSection = () => {
  const eventTime = moment("01/02/1970 09:00", "MM/DD/YYYY HH:mm");
  const duration1800 = eventTime.diff(
    moment("01/01/1970 18:00", "MM/DD/YYYY HH:mm"),
    "seconds"
  );

  const calendarChoice = [
    {
      duration: duration1800,
      title: "18:00 the day before the event",
    },
    { duration: 0, title: "09:00 the day of the event" },
  ];
  const [calendarSelection, setCalendarSelection] = useState(0);

  return (
    <>
      <List.Section>
        <List.Subheader>Notification</List.Subheader>
        <Divider />
        <List.Item
          title="Arrival / Departure Alert"
          description="Enabled"
          left={(props) => <List.Icon {...props} icon="calendar" />}
        />
        <List.Accordion
          title="Calendar Event"
          description={`Alert at ${
            calendarChoice.find(
              (choice) => choice.duration === calendarSelection
            ).title
          }`}
          left={(props) => (
            <List.Icon {...props} style={{ marginLeft: 0 }} icon="calendar" />
          )}
        >
          <EventNotificationItem
            choice={calendarChoice.find(
              (choice) => choice.duration === duration1800
            )}
            calendarSelection={calendarSelection}
            setCalendarSelection={(selection) =>
              setCalendarSelection(selection)
            }
          />
          <EventNotificationItem
            choice={calendarChoice.find((choice) => choice.duration === 0)}
            calendarSelection={calendarSelection}
            setCalendarSelection={(selection) =>
              setCalendarSelection(selection)
            }
          />
        </List.Accordion>
        <Divider />
      </List.Section>
    </>
  );
};

export default NotificationSection;
