import React, { useState } from "react";
import { Divider, List } from "react-native-paper";

const EventNotificationItem = (props) => {
  return (
    <List.Item
      title={props.title}
      left={(iconProps) => (
        <List.Icon
          {...iconProps}
          icon={
            props.calendarSelection === props.selectionValue ? "check" : "blank"
          }
          color={
            props.calendarSelection === props.selectionValue
              ? props.color
              : "#F0F0F0"
          }
        />
      )}
      onPress={() => props.setCalendarSelection(props.selectionValue)}
    />
  );
};

const NotificationSection = () => {
  const calendarChoice = [
    "18:00 the day before the event",
    "09:00 the day of the event",
  ];
  const [calendarSelection, setCalendarSelection] = useState(1);

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
          description={`Alert at ${calendarChoice[calendarSelection - 1]}`}
          left={(props) => (
            <List.Icon {...props} style={{ marginLeft: 0 }} icon="calendar" />
          )}
        >
          <EventNotificationItem
            title={calendarChoice[0]}
            selectionValue={1}
            calendarSelection={calendarSelection}
            setCalendarSelection={(selection) =>
              setCalendarSelection(selection)
            }
          />
          <EventNotificationItem
            title={calendarChoice[1]}
            selectionValue={2}
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
