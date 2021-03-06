import React from "react";
import PlateSection from "../../components/settings/PlateSection";
import StudentSection from "../../components/settings/StudentSection";
import NotificationSection from "../../components/settings/NotificationSection";
import { useSelector } from "react-redux";
import { Appbar } from "react-native-paper";
import { StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Settings = ({ navigation }) => {
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      <StatusBar barStyle="light-content" />
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
      <ScrollView>
        <NotificationSection />
        {role === 1 && (
          <>
            <PlateSection />
            <StudentSection />
          </>
        )}
      </ScrollView>
    </>
  );
};

export default Settings;
