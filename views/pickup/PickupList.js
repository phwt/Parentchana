import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Card, Title, Paragraph, Button, Appbar } from "react-native-paper";
import moment from "moment";
import { loadPickupStudents, onPickupListChange } from "../../modules/Firebase";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";

const PickupItem = ({ item, studentList }) => {
  return (
    <Card>
      <Card.Content>
        <Title>{item.plate}</Title>
        <Paragraph>
          {moment.unix(item.timestamp.seconds).format("HH:mm - MM/DD/YYYY")}
        </Paragraph>
        <Paragraph>
          {item.students
            .map((i) => {
              const student = studentList.find((student) => student.id === i);
              return `- ${i} | ${student.firstname} ${student.lastname}`;
            })
            .join("\n")}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

PickupItem.propTypes = {
  item: PropTypes.object.isRequired,
  studentList: PropTypes.array.isRequired,
};

const PickupList = ({ navigation }) => {
  const studentNameList = useSelector((state) => state.pickup.students);

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
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Pickup List" subtitle="Today's list" />
      </Appbar.Header>
      <View>
        <FlatList
          data={studentList}
          renderItem={({ item }) => (
            <PickupItem item={item} studentList={studentNameList} />
          )}
          keyExtractor={(i) => i.id}
          refreshing={refreshing}
          onRefresh={loadStudent}
          ListEmptyComponent={() => {
            return (
              <View style={{ marginTop: 32 }}>
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  No checked-in student
                </Text>
                <Text style={{ textAlign: "center" }}>
                  Auto-Refreshing is on
                </Text>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

export default PickupList;
