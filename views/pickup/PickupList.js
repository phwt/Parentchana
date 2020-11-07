import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import * as firebase from "firebase";
import moment from "moment";
import { connect } from "react-redux";
import { loadPickupList } from "../../store/actions/pickupActions";

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
  // let [studentList, setStudentList] = useState([]);

  useEffect(() => {
    (async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        await loadPickupList();
      } catch (error) {
        throw error;
      }
    })();
    // (async () => {
    //   const snapshot = await firebase.firestore().collection("pickup").get();
    //   const listData = snapshot.docs.map((doc) => {
    //     return { id: doc.id, ...doc.data() };
    //   });
    //   setStudentList(listData);
    // })();
  }, []);

  return (
    <View>
      <FlatList
        data={props.pickupList}
        renderItem={PickupItem}
        keyExtractor={(i) => i.id}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    pickupList: state.pickup.list,
  };
};

export default connect(mapStateToProps)(PickupList);
