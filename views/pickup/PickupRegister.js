import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import {
  TextInput,
  FAB,
  Button,
  Dialog,
  Portal,
  List,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  addPickupStudent,
  removePickupStudent,
  changePickupPlate,
} from "../../store/actions/profileActions";
import { Grid, Row, Col } from "react-native-easy-grid";
import { PropTypes } from "prop-types";

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

AddStudentDialog.propTypes = {
  visible: PropTypes.bool,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onDismiss: PropTypes.func,
  onPress: PropTypes.func,
  onPress1: PropTypes.func,
};

const PickupRegister = () => {
  const [registerInput, setRegisterInput] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const registeredStudents = useSelector(
    (state) => state.profile.pickupStudents
  );
  const registeredPlate = useSelector((state) => state.profile.pickupPlate);

  const dispatch = useDispatch();

  const addStudentHandler = useCallback(() => {
    if (!registeredStudents.includes(registerInput)) {
      dispatch(addPickupStudent(registerInput));
      setRegisterInput("");
      setDialogVisible(false);
    } else {
      alert("Student already exist!");
    }
  }, [dispatch]);

  const removeStudentHandler = useCallback(
    (id) => {
      dispatch(removePickupStudent(id));
    },
    [dispatch]
  );

  const changePlateHandler = useCallback(
    (plateNo) => {
      dispatch(changePickupPlate(plateNo));
    },
    [dispatch]
  );

  return (
    <Grid>
      <Row size={10} style={{ margin: 16 }}>
        <TextInput
          label="Plate Number"
          value={registeredPlate}
          onChangeText={(plate) => changePlateHandler(plate)}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
          }}
        />
      </Row>
      <Row size={90}>
        <FlatList
          data={registeredStudents}
          renderItem={({ item }) => (
            <List.Item
              title={item}
              description="ชื่อ นามสกุล" // TODO: Fetch name from firebase/database
              left={(props) => <List.Icon {...props} icon="account-circle" />}
              onPress={() => removeStudentHandler(item)}
            />
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
      </Row>

      <AddStudentDialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        onChangeText={setRegisterInput}
        value={registerInput}
        onPress={() => addStudentHandler()}
        onPress1={() => setDialogVisible(true)}
      />
    </Grid>
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
