import React from "react";
import { Text } from "react-native";
import { DataTable } from "react-native-paper";
import { Switch } from "react-native-paper";

const CalendarFavorite = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Date</DataTable.Title>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Alert</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>Frozen yogurt</DataTable.Cell>
        <DataTable.Cell>159</DataTable.Cell>
        <DataTable.Cell>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
        <DataTable.Cell>237</DataTable.Cell>
        <DataTable.Cell>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </DataTable.Cell>
      </DataTable.Row>

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

export default CalendarFavorite;
