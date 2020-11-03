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
      <Paragraph>{item.students.map((i) => `- ${i}${"\n"}`)}</Paragraph>
    </Card.Content>
  </Card>
);

const PickupList = () => {
  let [studentList, setStudentList] = useState([]);

  useEffect(() => {
    (async () => {
      const snapshot = await firebase.firestore().collection("pickup").get();
      const listData = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setStudentList(listData);
    })();
  }, []);

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
