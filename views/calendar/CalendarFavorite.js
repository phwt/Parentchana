import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";
import { Switch } from "react-native-paper";
import { connect } from "react-redux";

import {
  loadCalendarList,
  loadCalendarFavorite,
} from "../../store/actions/calendarActions";
import axios from "axios";
import {calendarConfig} from "../../config";

const CalendarFavorite = (props) => {
  let [events, setEvents] = useState([]);
  const [favoriteData, setFavoriteData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
            calendarConfig.calendarId
          )}/events?key=${calendarConfig.apiKey}`
        );
        setEvents(data.items);
        await loadCalendarFavorite();
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  useEffect(()=> {
    setFavoriteData(
      //find fav by find the same id from calendarFavorite and calendar API
      props.calendarFavorite.map((id) =>
        events.find((item) => item.id === id)
      )
    );
  }, [props.calendarFavorite, events]);

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
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Date</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Alert</DataTable.Title>
      </DataTable.Header>
      <FlatList
        style={{ width: "100%" }}
        data={favoriteData}
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
  );
};

const mapStateToProps = (state) => {
  return {
    // calendarAPI: state.calendar.list,
    calendarFavorite: state.calendar.favorite,
  };
};

const mapDispatchToProps = {
  loadCalendarList,
  loadCalendarFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarFavorite);
