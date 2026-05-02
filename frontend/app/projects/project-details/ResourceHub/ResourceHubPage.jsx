import React, { useState } from "react";
import "./ResourceHubPage.css";
import ResourceHeading from "./ResourceHubHeading/ResourceHubHeading.jsx";
import ResourceHubToggle from "./ResourceHubToggle/ResourceHubToggle.jsx";
import ResourceManagementTable from "./ResourcesManagementTable/ResourceManagementTable.jsx";
import MaterialTable from "./MaterialTable/MaterialTable.jsx";
import CrewTable from "./crewhrmanagement/crewmanagementtable.jsx";

export default function ResourceHubPage() {
  const [activeToggle, setActiveToggle] = useState(0);

  return (
    <div className="Resource-hub-page">
      <ResourceHubToggle
        activeToggle={activeToggle}
        setActiveToggle={setActiveToggle}
      />

      {activeToggle === 1 && <CrewTable />}
      {activeToggle === 0 && <MaterialTable />}
      {activeToggle === 2 && <ResourceManagementTable />}
    </div>
  );
}
