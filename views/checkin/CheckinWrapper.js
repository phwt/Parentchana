import React, { useState, useEffect } from "react";
import { Picker, StatusBar } from "react-native";
import { Appbar, Button } from "react-native-paper";
import CheckIn from "./CheckIn";
import { useSelector } from "react-redux";
import Color from "../../modules/Color";

const CheckInWrapper = ({ navigation }) => {
  const [resetting, setResetting] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState("");
  const userStudents = useSelector((state) => state.profile.pickupStudents);

  useEffect(() => {
    setSelectedStudent(userStudents[0]);
  }, []);

  const refreshComponent = () => {
    setResetting(true);
    setTimeout(() => {
      setResetting(false);
    }, 500);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Appbar.Header style={{ backgroundColor: Color.checkinKey }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content
          title="Time Check-in"
          subtitle={
            resetting ? "Select student" : `Showing ${selectedStudent}'s info`
          }
        />
        {resetting && (
          <Appbar.Action
            icon="settings"
            onPress={() => {
              navigation.navigate("Settings");
            }}
          />
        )}
        {!resetting && (
          <>
            <Appbar.Action
              icon="account-edit"
              onPress={() => {
                setResetting(true);
              }}
            />
            <Appbar.Action icon="refresh" onPress={refreshComponent} />
          </>
        )}
      </Appbar.Header>

      {resetting && (
        <>
          <Picker
            selectedValue={selectedStudent}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedStudent(itemValue)
            }
          >
            {userStudents.map((item) => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
          <Button
            onPress={() => {
              setResetting(false);
            }}
          >
            Select Student
          </Button>
        </>
      )}

      {!resetting && <CheckIn selectedStudent={selectedStudent} />}
    </>
  );
};

export default CheckInWrapper;
