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

  const mapStudentList = (snapshot) => {
    return snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  };

  const loadStudent = () => {
    (async () => {
      const snapshot = await firebase
        .firestore()
        .collection("pickup")
        .orderBy("timestamp")
        .get();
      setStudentList(mapStudentList(snapshot));
    })();
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("pickup")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        setStudentList(mapStudentList(snapshot));
      });
  }, []);

  return (
    <View>
      <Button onPress={loadStudent()}>Refresh</Button>
      <FlatList
        data={studentList}
        renderItem={PickupItem}
        keyExtractor={(i) => i.id}
        inverted
      />
    </View>
  );
};

export default PickupList;
