import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import moment from "moment";
import { loadPickupStudents, onPickupListChange } from "../../modules/Firebase";
import { PropTypes } from "prop-types";

const PickupItem = ({ item }) => (
  <Card>
    <Card.Content>
      <Title>{item.plate}</Title>
      <Paragraph>
        {moment.unix(item.timestamp.seconds).format("HH:mm - MM/DD/YYYY")}
      </Paragraph>
      <Paragraph>{item.students.map((i) => `- ${i}`).join("\n")}</Paragraph>
    </Card.Content>
  </Card>
);

PickupItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const PickupList = (props) => {
  let [studentList, setStudentList] = useState([]);
  let [refreshing, setRefreshing] = useState(false);

  const loadStudent = async () => {
    setRefreshing(true);
    setStudentList(await loadPickupStudents());
    setRefreshing(false);
  };

  useEffect(() => {
    onPickupListChange((updatedList) => {
      setStudentList(updatedList);
    });
  }, []);

  return (
    <View>
      <FlatList
        data={studentList}
        renderItem={PickupItem}
        keyExtractor={(i) => i.id}
        refreshing={refreshing}
        onRefresh={loadStudent}
        ListEmptyComponent={() => {
          return (
            <View style={{ marginTop: 32 }}>
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                No checked-in student
              </Text>
              <Text style={{ textAlign: "center" }}>Auto-Refreshing is on</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default PickupList;
