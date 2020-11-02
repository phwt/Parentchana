import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { checkinAPI } from "../../store/mockData";
const CheckInDetailed = () => {
  let [checkinList, setcheckinList] = useState(checkinAPI);
  return <ScrollView>
    <View style={styles.container}>
      <Text style={styles.text}>เข้าโรงเรียน</Text>
      {checkinList.map((checkin) => {
        if (checkin.type == "arrival") {
          return <View >
            <Text key={checkin.studentId.toString()+new Date()}><Text style={styles.title}>รหัสนักเรียน : </Text>{checkin.studentId}</Text>
            <Text key={checkin.timestamp.getDate().toString()+new Date()}><Text style={styles.title}>วันที่ : </Text >{checkin.timestamp.getDate()}/{checkin.timestamp.getMonth()}/{checkin.timestamp.getFullYear()}</Text>
            <Text key={checkin.timestamp.getHours().toString()+new Date()}><Text style={styles.title}>เวลา : </Text >{checkin.timestamp.getHours().toString().length != 2 ? "0" + checkin.timestamp.getHours() : checkin.timestamp.getHours()}
      :{checkin.timestamp.getMinutes().toString().length != 2 ? "0" + checkin.timestamp.getMinutes() : checkin.timestamp.getMinutes()}</Text>
            <Text key={checkin.ontime.toString()+new Date()}><Text style={styles.title}>เดินทางมาโรงเรียน : </Text >{checkin.ontime ? "ปกติ" : "มาสาย"}</Text>
            <Text style={styles.title}>--------------------------------</Text>
          </View>;
        }
      })}

      <Text style={styles.text}>ออกโรงเรียน</Text>
      {checkinList.map((checkin) => {
        if (checkin.type == "departure") {
          return <View>
            <Text key={checkin.studentId.toString()+new Date()}><Text style={styles.title}>รหัสนักเรียน : </Text >{checkin.studentId}</Text>
            <Text key={checkin.timestamp.getDate().toString()+new Date()}><Text style={styles.title}>วันที่ : </Text >{checkin.timestamp.getDate()}/{checkin.timestamp.getMonth()}/{checkin.timestamp.getFullYear()}</Text>
            <Text key={checkin.timestamp.getHours().toString()+new Date()}><Text style={styles.title}>เวลา :</Text >{checkin.timestamp.getHours().toString().length != 2 ? "0" + checkin.timestamp.getHours() : checkin.timestamp.getHours()}
        :{checkin.timestamp.getMinutes().toString().length != 2 ? "0" + checkin.timestamp.getMinutes() : checkin.timestamp.getMinutes()}</Text>
            <Text style={styles.title}>--------------------------------</Text>
          </View>;
        }
      })}

      <Text style={styles.text}>ขาดเรียน</Text>
      {checkinList.map((checkin) => {
        if (checkin.type == "absent") {
          return <View>
            <Text key={checkin.studentId.toString()+new Date()}><Text style={styles.title}>รหัสนักเรียน : </Text >{checkin.studentId}</Text>
            <Text key={checkin.timestamp.getDate().toString()+new Date()}><Text style={styles.title}>วันที่ : </Text >{checkin.timestamp.getDate()}/{checkin.timestamp.getMonth()}/{checkin.timestamp.getFullYear()}</Text>
            <Text style={styles.title}>--------------------------------</Text>
          </View>;
        }
      })}
    </View>
  </ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 25,
  },
  title: {
    fontWeight: "bold",
  }
});

export default CheckInDetailed;
