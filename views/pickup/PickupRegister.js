import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const PickupRegister = () => {
  const [registerInput, setRegisterInput] = useState("");
  const [registerList, setRegisterList] = useState([]);

  const addStudent = () => {
    if (!registerList.includes(registerInput)) {
      setRegisterList([...registerList, registerInput]);
      setRegisterInput("");
    } else {
      alert("Student already exist!");
    }
  };

  const removeStudent = (id) => {
    setRegisterList(registerList.filter((i) => i !== id));
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={setRegisterInput}
        value={registerInput}
      />
      <Button title="Add" onPress={addStudent} />
      {registerList.map((i) => (
        <>
          <Text style={{ textAlign: "center" }}>{i}</Text>
          <Button title="Remove" onPress={() => removeStudent(i)} />
        </>
      ))}
    </View>
  );
};

export default PickupRegister;
