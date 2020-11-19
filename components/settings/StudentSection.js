import {
  Button,
  Dialog,
  Divider,
  List,
  Portal,
  TextInput,
} from "react-native-paper";
import { FlatList, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPickupStudent,
  removePickupStudent,
} from "../../store/actions/profileActions";
import { PropTypes } from "prop-types";

const AddStudentDialog = (props) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue("");
  }, [props.visible]);

  return (
    <>
      <Portal>
        <Dialog visible={props.visible} onDismiss={props.onDismiss}>
          <Dialog.Title>Add Student</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Student ID"
              onChangeText={setInputValue}
              value={inputValue}
              keyboardType="numeric"
              maxLength={8}
              autoFocus={true}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={props.onDismiss}>Cancel</Button>
            <Button onPress={() => props.onAddPress(inputValue)}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

AddStudentDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onAddPress: PropTypes.func.isRequired,
};

const StudentSection = () => {
  const [studentDialogVisible, setStudentDialogVisible] = useState(false);

  const registeredStudents = useSelector(
    (state) => state.profile.pickupStudents
  );

  const dispatch = useDispatch();

  const addStudentHandler = useCallback(
    (studentId) => {
      if (!registeredStudents.includes(studentId)) {
        dispatch(addPickupStudent(studentId));
        setStudentDialogVisible(false);
      } else {
        alert("Student already exist!");
      }
    },
    [dispatch]
  );

  const removeStudentHandler = useCallback(
    (id) => {
      dispatch(removePickupStudent(id));
    },
    [dispatch]
  );

  return (
    <>
      <List.Section>
        <List.Subheader>Student Info</List.Subheader>
        <FlatList
          data={registeredStudents}
          renderItem={({ item }) => (
            <>
              <Divider />
              <List.Item
                title={item}
                description="ชื่อ นามสกุล" // TODO: Fetch name from firebase/database
                left={(props) => <List.Icon {...props} icon="account-circle" />}
                onPress={() => removeStudentHandler(item)}
              />
            </>
          )}
          keyExtractor={(i) => String(registeredStudents.indexOf(i))}
          ListEmptyComponent={() => {
            return (
              <View style={{ marginTop: 32 }}>
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  No student added
                </Text>
                <Text style={{ textAlign: "center" }}>
                  Add new student by pressing the + button below
                </Text>
              </View>
            );
          }}
        />
        <Divider />
        <List.Item
          title="Add New"
          description="Add New" // TODO: Fetch name from firebase/database
          left={(props) => <List.Icon {...props} icon="plus" />}
          onPress={() => setStudentDialogVisible(true)}
        />
        <Divider />
      </List.Section>

      <AddStudentDialog
        visible={studentDialogVisible}
        onDismiss={() => setStudentDialogVisible(false)}
        onAddPress={(studentId) => addStudentHandler(studentId)}
      />
    </>
  );
};

export default StudentSection;
