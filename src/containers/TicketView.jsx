import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { findTicketByTicketNumber } from "../api/tickets";
import { CiSquareInfo } from "react-icons/ci";
import { MdRemoveCircle } from "react-icons/md";
import { getTicketTasks } from "../api/tasks";
import { IoPersonCircleOutline } from "react-icons/io5";
import { SiMicrosoftteams } from "react-icons/si";
import { ChangeView, IncidentView, ServiceRequestView } from "../components";
import { updateTaskStatus, deleteTaskByID } from "../api/tasks";

const TicketView = ({ userData, companyTeams }) => {
  const [ticket, setTicket] = useState(null);
  const { ticketNumber } = useParams();
  const [tasks, setTasks] = useState([]);
  const [addTaskActive, setAddTaskActive] = useState(false);
  const [activeTicketFooter, setActiveTicketFooter] = useState("AuditLog");

  const [ticketValues, setTicketValues] = useState({
    title: "",
    type: "",
    description: "",
    priority: "",
    status: "",
    userAssigned: "",
    approved: "",
    elevatedAccess: "",
    team: "",
    implementationStart: "",
    implementationEnd: "",
    completeBy: "",
    masterTicket: false,
    linkedTickets: [],
    involvedTeams: [],
    relatedTicket: [],
    emergency: false,
  });

  //     const dateValue = new Date(date);

  const formatTimestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: "EST",
    };
    return new Date(timestamp).toLocaleString("en-US", options);
  };

  const handleAddTeamClick = async (e, addedTeam) => {
    try {
      setTicketValues({
        ...ticketValues,
        involvedTeams: [...ticketValues.involvedTeams, addedTeam],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveTeam = async (e, team) => {
    try {
      const updatedArray = ticketValues.involvedTeams.filter(
        (removedTeam) => removedTeam !== team
      );
      setTicketValues({ ...ticketValues, involvedTeams: updatedArray });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTask = async (status, taskID) => {
    console.log("These should be selected status:", status);
    await updateTaskStatus(taskID, status);
    fetchTicketInfo();
  };

  const handleAddTeam = async () => {
    try {
      const selectedValue = document.getElementById("team");
      let output = selectedValue.options[selectedValue.selectedIndex].value;
      return output;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTicketInfo = async () => {
    const fetchedTicket = await findTicketByTicketNumber(ticketNumber);
    setTicketValues(fetchedTicket);
    setTicket(fetchedTicket);
    const ticketTasks = await getTicketTasks(ticketNumber);
    // console.log(ticketTasks);
    setTasks(ticketTasks);
  };

  const handleTaskDelete = async (taskID) => {
    await deleteTaskByID(taskID);
  };

  useEffect(() => {
    fetchTicketInfo();
  }, []);

  if (!ticket) {
    return (
      <div className="flex justify-center text-white mt-10">
        No ticket found. Please contact administrator to recover ticket.
      </div>
    );
  }

  // userData={userData} companyTeams={companyTeams} ticketValues={ticketValues} setTicketValues={setTicketValues} tasks={tasks} setTasks={setTasks} handleAddTeamClick={handleAddTeamClick} handleAddTeam={handleAddTeam} handleRemoveTeam={handleRemoveTeam} formatTimestamp={formatTimestamp}
  return (
    <div className="flex grow min-h-screen">
      {ticketValues.type === "Change" ? (
        <ChangeView
          userData={userData}
          companyTeams={companyTeams}
          ticketValues={ticketValues}
          setTicketValues={setTicketValues}
          tasks={tasks}
          setTasks={setTasks}
          handleAddTeamClick={handleAddTeamClick}
          handleAddTeam={handleAddTeam}
          handleRemoveTeam={handleRemoveTeam}
          formatTimestamp={formatTimestamp}
          handleUpdateTask={handleUpdateTask}
          fetchTicketInfo={fetchTicketInfo}
          handleTaskDelete={handleTaskDelete}
          activeTicketFooter={activeTicketFooter}
          setActiveTicketFooter={setActiveTicketFooter}
        />
      ) : null}
      {ticketValues.type === "Incident" ? (
        <IncidentView
          userData={userData}
          companyTeams={companyTeams}
          ticketValues={ticketValues}
          setTicketValues={setTicketValues}
          activeTicketFooter={activeTicketFooter}
          setActiveTicketFooter={setActiveTicketFooter}
          handleAddTeamClick={handleAddTeamClick}
          handleAddTeam={handleAddTeam}
          handleRemoveTeam={handleRemoveTeam}
          formatTimestamp={formatTimestamp}
          fetchTicketInfo={fetchTicketInfo}
        />
      ) : null}
      {ticketValues.type === "Service Request" ? (
        <ServiceRequestView
          userData={userData}
          companyTeams={companyTeams}
          ticketValues={ticketValues}
          setTicketValues={setTicketValues}
          activeTicketFooter={activeTicketFooter}
          setActiveTicketFooter={setActiveTicketFooter}
          handleAddTeamClick={handleAddTeamClick}
          handleAddTeam={handleAddTeam}
          handleRemoveTeam={handleRemoveTeam}
          formatTimestamp={formatTimestamp}
          fetchTicketInfo={fetchTicketInfo}
        />
      ) : null}
    </div>
  );
};

export default TicketView;
