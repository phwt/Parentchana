import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import {
  TextInput,
  FAB,
  Button,
  Dialog,
  Portal,
  List,
} from "react-native-paper";

const AddStudentDialog = (props) => {
  return (
    <>
      <Portal>
        <Dialog visible={props.visible} onDismiss={props.onDismiss}>
          <Dialog.Title>Add Student</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Student ID"
              onChangeText={props.onChangeText}
              value={props.value}
              keyboardType="numeric"
              maxLength={8}
              autoFocus={true}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={props.onDismiss}>Cancel</Button>
            <Button onPress={props.onPress}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        style={styles.fab}
        icon="plus"
        label="Add Student"
        onPress={props.onPress1}
      />
    </>
  );
};

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
      {registerList.length === 0 && (
        <View style={{ marginTop: 32 }}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            No student added
          </Text>
          <Text style={{ textAlign: "center" }}>
            Add new student by pressing the + button below
          </Text>
        </View>
      )}

      {registerList.length > 0 && (
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
          keyExtractor={(i) => String(registerList.indexOf(i))}
        />
      )}

      <AddStudentDialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        onChangeText={setRegisterInput}
        value={registerInput}
        onPress={() => addStudent()}
        onPress1={() => setDialogVisible(true)}
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
