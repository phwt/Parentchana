import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import * as firebase from "firebase";

const PickupItem = ({ item }) => (
  <View>
    <Text>{item.plate}</Text>
    <Text>{item.timestamp.seconds}</Text>
    <Text>{item.students.map((i) => `- ${i}${"\n"}`)}</Text>
  </View>
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
