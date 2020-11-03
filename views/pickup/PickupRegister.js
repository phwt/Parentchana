import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  TextInput,
  FAB,
  Button,
  Dialog,
  Portal,
  List,
} from "react-native-paper";

const PickupRegister = () => {
  const [registerInput, setRegisterInput] = useState("");
  const [registerList, setRegisterList] = useState(["12345", "12346", "12347"]);
  const [dialogVisible, setDialogVisible] = useState(false);

  const addStudent = () => {
    if (!registerList.includes(registerInput)) {
      setRegisterList([...registerList, registerInput]);
      setRegisterInput("");
      setDialogVisible(false);
    } else {
      alert("Student already exist!");
    }
  };

  const removeStudent = (id) => {
    setRegisterList(registerList.filter((i) => i !== id));
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <FlatList
        data={registerList}
        renderItem={({ item }) => (
          <List.Item
            title={item}
            description="ชื่อ นามสกุล" // TODO: Fetch name from firebase/database
            left={(props) => <List.Icon {...props} icon="account-circle" />}
            onPress={() => removeStudent(item)}
          />
        )}
      />

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <Dialog.Title>Add Student</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Student ID"
              onChangeText={setRegisterInput}
              value={registerInput}
              keyboardType="numeric"
              maxLength={5}
              autoFocus={true}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            <Button onPress={() => addStudent()}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        style={styles.fab}
        icon="plus"
        label="Add Student"
        onPress={() => setDialogVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default PickupRegister;
