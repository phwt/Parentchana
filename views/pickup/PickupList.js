import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as firebase from "firebase";

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
      {studentList.map(({ id, plate, students, timestamp }) => (
        // TODO: Render using FlatList
        <View key={id}>
          <Text>{plate}</Text>
          <Text>{students}</Text>
          <Text>{timestamp.seconds}</Text>
          <Text>{"\n"}</Text>
        </View>
      ))}
    </View>
  );
};

export default PickupList;
