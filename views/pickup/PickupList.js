import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import * as firebase from "firebase";
import moment from "moment";

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

const PickupList = (props) => {
  let [studentList, setStudentList] = useState([]);
  let [refreshing, setRefreshing] = useState(false);

  const mapStudentList = (snapshot) => {
    return snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  };

  const loadStudent = () => {
    (async () => {
      setRefreshing(true);
      const snapshot = await firebase
        .firestore()
        .collection("pickup")
        .orderBy("timestamp", "desc")
        .get();
      setStudentList(mapStudentList(snapshot));
      setRefreshing(false);
    })();
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("pickup")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setStudentList(mapStudentList(snapshot));
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
