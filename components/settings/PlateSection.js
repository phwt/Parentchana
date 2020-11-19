import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Divider,
  List,
  Portal,
  TextInput,
} from "react-native-paper";
import { PropTypes } from "prop-types";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changePickupPlate } from "../../store/actions/profileActions";

const PlateChangeDialog = (props) => {
  const [inputValue, setInputValue] = useState(props.value);

  useEffect(() => {
    setInputValue(props.value);
  }, [props.visible]);

  return (
    <>
      <Portal>
        <Dialog visible={props.visible} onDismiss={props.onDismiss}>
          <Dialog.Title>Change Plate Number</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Plate Number"
              onChangeText={setInputValue}
              value={inputValue}
              autoFocus={true}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={props.onDismiss}>Cancel</Button>
            <Button onPress={() => props.onSave(inputValue)}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

PlateChangeDialog.propTypes = {
  value: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

const PlateSection = () => {
  const [plateDialogVisible, setPlateDialogVisible] = useState(false);

  const registeredPlate = useSelector((state) => state.profile.pickupPlate);
  const dispatch = useDispatch();

  const changePlateHandler = useCallback(
    (plateNo) => {
      dispatch(changePickupPlate(plateNo));
      setPlateDialogVisible(false);
    },
    [dispatch]
  );

  return (
    <>
      <List.Section>
        <List.Subheader>Vehicle Info</List.Subheader>
        <Divider />
        <TouchableOpacity onPress={() => setPlateDialogVisible(true)}>
          <List.Item
            title="Plate Number"
            description={registeredPlate}
            left={() => <List.Icon icon="car-back" />}
          />
        </TouchableOpacity>
        <Divider />
      </List.Section>

      <PlateChangeDialog
        value={registeredPlate}
        visible={plateDialogVisible}
        onDismiss={() => setPlateDialogVisible(false)}
        onSave={(plateNo) => changePlateHandler(plateNo)}
      />
    </>
  );
};

export default PlateSection;
