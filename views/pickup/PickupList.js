import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import * as firebase from "firebase";
import moment from "moment";

const PickupItem = ({ item }) => (
  <Card>
    <Card.Content>
      <Title>{item.plate}</Title>
      <Paragraph>
        {moment.unix(item.timestamp.seconds).format("HH:MM - MM/DD/YYYY")}
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

  firebase
    .firestore()
    .collection("pickup")
    .onSnapshot((snapshot) => {
      setStudentList(mapStudentList(snapshot));
    });

  return (
    <View>
      <FlatList
        data={studentList}
        renderItem={PickupItem}
        keyExtractor={(i) => i.id}
      />
    </View>
  );
};

export default PickupList;
