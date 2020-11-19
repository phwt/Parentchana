import React from "react";
import PlateSection from "../../components/settings/PlateSection";
import StudentSection from "../../components/settings/StudentSection";
import NotificationSection from "../../components/settings/NotificationSection";
import { useSelector } from "react-redux";

const Settings = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <>
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
