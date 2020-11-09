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
  registerPlate,
  getRegisteredPlate,
} from "../../store/actions/pickupActions";
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

const PickupRegister = (props) => {
  const [registerInput, setRegisterInput] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    (async () => {
      await loadRegisteredStudent();
      await getRegisteredPlate();
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
    <Grid>
      <Row size={10} style={{ margin: 16 }}>
        <TextInput
          label="Plate Number"
          value={props.registeredPlate}
          onChangeText={(plate) => props.registerPlate(plate)}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
          }}
        />
      </Row>
      <Row size={90}>
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
        {/*)}*/}
      </Row>

      <AddStudentDialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        onChangeText={setRegisterInput}
        value={registerInput}
        onPress={() => addStudent()}
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

PickupRegister.propTypes = {
  registeredStudent: PropTypes.array.isRequired,
  registeredPlate: PropTypes.string.isRequired,
  registerNewStudent: PropTypes.func.isRequired,
  deregisterStudent: PropTypes.func.isRequired,
  registerPlate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    registeredStudent: state.pickup.registeredStudent,
    registeredPlate: state.pickup.registeredPlate,
  };
};

const mapDispatchToProps = {
  registerNewStudent,
  deregisterStudent,
  registerPlate,
};

export default connect(mapStateToProps, mapDispatchToProps)(PickupRegister);
