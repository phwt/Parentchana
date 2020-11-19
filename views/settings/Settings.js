import React from "react";
import PlateSection from "../../components/settings/PlateSection";
import StudentSection from "../../components/settings/StudentSection";
import NotificationSection from "../../components/settings/NotificationSection";

const Settings = () => {
  return (
    <>
      <NotificationSection />
      <PlateSection />
      <StudentSection />
    </>
  );
};

export default Settings;
