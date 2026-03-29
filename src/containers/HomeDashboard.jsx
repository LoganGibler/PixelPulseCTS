import React from "react";
import PropTypes from "prop-types";
import {
  ChangeDashboard,
  IncidentDash,
  ServiceReqDash,
  TaskDashboard,
} from "../components";

const HomeDashboard = ({ userData }) => {
  if (userData === null) return null;
  return (
    <div className="flex flex-col grow">
      <div className="flex flex-col md:flex-row grow gap-4 p-4">
        <IncidentDash userData={userData} />
        <ServiceReqDash userData={userData} />
      </div>
      <div className="flex flex-col md:flex-row grow gap-4 px-4 pb-4">
        <TaskDashboard userData={userData} />
        <ChangeDashboard userData={userData} />
      </div>
    </div>
  );
};

HomeDashboard.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default HomeDashboard;
