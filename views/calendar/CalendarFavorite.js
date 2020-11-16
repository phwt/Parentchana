import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { DataTable } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchCalendarEvents } from "../../store/actions/calendarActions";

const CalendarFavorite = (props) => {
  const events = useSelector((state) => state.calendar.events);
  const favoriteEvents = useSelector((state) => state.calendar.favorite);
  const [favoriteList, setFavoriteList] = useState([]);
  const dispatch = useDispatch();

  const loadCalendarEvents = useCallback(async () => {
    try {
      await dispatch(fetchCalendarEvents());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    loadCalendarEvents();
  }, [loadCalendarEvents]);

  useEffect(() => {
    //find fav by find the same id from calendarFavorite and calendar API
    setFavoriteList(
      favoriteEvents.map((favItem) =>
        events.find((item) => item.id === favItem.eventId)
      )
    );
  }, [favoriteEvents, events]);

  const renderFavoriteItem = (itemData) => {
    console.log(itemData);
    return (
      <DataTable.Row>
        <DataTable.Cell>{itemData.item.start.date.toString()}</DataTable.Cell>
        <DataTable.Cell>{itemData.item.summary}</DataTable.Cell>
      </DataTable.Row>
    );
  };

  return (
    <>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
        </DataTable.Header>
        <FlatList
          style={{ width: "100%" }}
          data={favoriteList}
          renderItem={renderFavoriteItem}
        />
      </DataTable>
    </>
  );
};

export default CalendarFavorite;
