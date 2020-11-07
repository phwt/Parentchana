import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import {
  TextInput,
  FAB,
  Button,
  Dialog,
  Portal,
  List,
} from "react-native-paper";
import { connect } from "react-redux";
import {
  loadRegisteredStudent,
  registerNewStudent,
  deregisterStudent,
} from "../../store/actions/pickupActions";

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

const PickupRegister = (props) => {
  const [registerInput, setRegisterInput] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    (async () => {
      await props.loadRegisteredStudent();
    })();
  }, []);

  const addStudent = async () => {
    if (!props.registeredStudent.includes(registerInput)) {
      await props.registerNewStudent(registerInput);
      setRegisterInput("");
      setDialogVisible(false);
    } else {
      alert("Student already exist!");
    }
  };

  const removeStudent = (id) => {
    props.deregisterStudent(id);
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      {/*{props.registeredStudent && (*/}
      {/*  <View style={{ marginTop: 32 }}>*/}
      {/*    <Text style={{ textAlign: "center", fontWeight: "bold" }}>*/}
      {/*      No student added*/}
      {/*    </Text>*/}
      {/*    <Text style={{ textAlign: "center" }}>*/}
      {/*      Add new student by pressing the + button below*/}
      {/*    </Text>*/}
      {/*  </View>*/}
      {/*)}*/}

      {/*{!props.registeredStudent && (*/}
      <FlatList
        data={props.registeredStudent}
        renderItem={({ item }) => (
          <List.Item
            title={item}
            description="ชื่อ นามสกุล" // TODO: Fetch name from firebase/database
            left={(props) => <List.Icon {...props} icon="account-circle" />}
            onPress={() => removeStudent(item)}
          />
        )}
        keyExtractor={(i) => String(props.registeredStudent.indexOf(i))}
      />
      {/*)}*/}

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

const mapStateToProps = (state) => {
  return {
    registeredStudent: state.pickup.registeredStudent,
  };
};

const mapDispatchToProps = {
  loadRegisteredStudent,
  registerNewStudent,
  deregisterStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(PickupRegister);
