import React, { useEffect, useState } from "react";
import { View, FlatList, StatusBar } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Appbar,
  Text,
} from "react-native-paper";
import moment from "moment";
import { loadPickupStudents, onPickupListChange } from "../../modules/Firebase";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import Color from "../../modules/Color";

const PickupItem = ({ item, studentList }) => {
  return (
    <Card>
      <Card.Content>
        <Text
          style={{
            fontSize: 30,
            borderRadius: 5,
            shadowColor: "black",
            padding: 8,
            width: 120,
            backgroundColor: "#f1f1f1",
          }}
        >
          {item.plate}
        </Text>
        <Paragraph style={{ color: "gray" }}>
          {moment.unix(item.timestamp.seconds).format("HH:mm - MM/DD/YYYY")}
        </Paragraph>
        <Text style={{ fontSize: 18 }}>
          {item.students
            .map((i) => {
              const student = studentList.find((student) => student.id === i);
              return `${i} \t\t ${student.firstname} ${student.lastname}`;
            })
            .join("\n")}
        </Text>
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
      <StatusBar barStyle="light-content" />
      <Appbar.Header style={{ backgroundColor: Color.pickupKey }}>
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
