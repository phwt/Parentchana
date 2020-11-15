import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";
import { Switch } from "react-native-paper";
import { useSelector } from "react-redux";

// import axios from "axios";
// import { calendarConfig } from "../../config";

const CalendarFavorite = (props) => {
  // const [events, setEvents] = useState([]);
  // const [loaded, setLoaded] = useState(false);

  const events = useSelector((state) => state.calendar.list);
  const favoriteEvents = useSelector((state) => state.calendar.favorite);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    // (async () => {
    //   try {
    //     const { data } = await axios.get(
    //       `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    //         calendarConfig.calendarId
    //       )}/events?key=${calendarConfig.apiKey}`
    //     );
    //     setEvents(data.items);
    //     await loadCalendarFavorite();
    //     setLoaded(true);
    //   } catch (error) {
    //     throw error;
    //   }
    // })();
  }, []);

  useEffect(() => {
    //find fav by find the same id from calendarFavorite and calendar API
    setFavoriteList(
      favoriteEvents.map((id) => events.find((item) => item.id === id))
    );
  }, [favoriteEvents, events]);

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const renderFavoriteItem = (itemData) => {
    console.log(itemData);
    return (
      <DataTable.Row>
        <DataTable.Cell>{itemData.item.start.date.toString()}</DataTable.Cell>
        <DataTable.Cell>{itemData.item.summary}</DataTable.Cell>
        <DataTable.Cell>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </DataTable.Cell>
      </DataTable.Row>
    );
  };

  return (
    <>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Alert</DataTable.Title>
        </DataTable.Header>
        <FlatList
          style={{ width: "100%" }}
          data={favoriteList}
          renderItem={renderFavoriteItem}
        />

        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={(page) => {
            console.log(page);
          }}
          label="1-2 of 6"
        />
      </DataTable>
    </>
  );
};

export default CalendarFavorite;
