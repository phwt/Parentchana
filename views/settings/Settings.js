import React from "react";
import PlateSection from "../../components/settings/PlateSection";
import StudentSection from "../../components/settings/StudentSection";
import NotificationSection from "../../components/settings/NotificationSection";
import { useSelector } from "react-redux";
import { Appbar } from "react-native-paper";

const Settings = ({ navigation }) => {
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content
          title="Settings"
          subtitle="Application related settings"
        />
      </Appbar.Header>
      <NotificationSection />
      {role === 1 && (
        <>
          <PlateSection />
          <StudentSection />
        </>
      )}
    </>
  );
};

export default Settings;
