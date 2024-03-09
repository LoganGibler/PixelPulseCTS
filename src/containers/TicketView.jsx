import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { findTicketByTicketNumber } from "../api/tickets";
import { CiSquareInfo } from "react-icons/ci";
import { MdRemoveCircle } from "react-icons/md";
import { getTicketTasks } from "../api/tasks";
import { IoPersonCircleOutline } from "react-icons/io5";
import { SiMicrosoftteams } from "react-icons/si";
import { ChangeView } from "../components";
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
      {/* <div className="bg-white grow max-w-[1115px] mx-2.5 mt-2.5 px-4 py-2.5 rounded-sm">
        <div>
          <div className="flex font-semibold">
            {" "}
            <select
              className="mr-3 pr-1 py-0.5 border-b-[2px] border-blue-700 hover:cursor-pointer"
              value={ticketValues.type}
              onChange={(e) =>
                setTicketValues({ ...ticketValues, type: e.target.value })
              }
            >
              <option value="Incident">Incident</option>
              <option value="Change">Change</option>
              <option value="Service Request">Service Request</option>
              <option value="Event">Event</option>
       
            </select>
            <p className="mt-2 mr-2">#{ticketValues.ticketNumber}</p>
            <div className="flex grow justify-end">
              <button className="py-1.5 px-2 border-green-500 border-2 text-green-500 rounded-md">
                Save Changes
              </button>
            </div>
          </div>

          <div className="flex grow">
            <input
              type="text"
              className="flex grow border-b-[2px] border-blue-200 py-1 text-ellipsis mt-5"
              defaultValue={ticketValues.title}
              onChange={(e) =>
                setTicketValues({ ...ticketValues, title: e.target.value })
              }
            ></input>
          </div>

          <div className="flex mt-6">
            <select
              defaultValue="Add Teams Here"
              className="hover:cursor-pointer pb-1 border-b-2 border-blue-200"
              size={1}
              id="team"
              onChange={async (e) => {
                handleAddTeamClick(e, await handleAddTeam());
              }}
            >
              {companyTeams.length
                ? companyTeams.map((team, index) => {
                    if (ticketValues.involvedTeams.includes(team)) {
                      return;
                    }

                    if (index === 0) {
                      return <option key={index}>Add Teams Here</option>;
                    }

                    return (
                      <option key={index} value={team}>
                        {team}
                      </option>
                    );
                  })
                : null}
            </select>
            <div className="flex justify-end grow">
              <select
                className="flex border-b-[2px] border-blue-200"
                value={ticketValues.status}
                onChange={(e) =>
                  setTicketValues({ ...ticketValues, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Submitted">Submitted</option>
                {ticketValues.type === "Change" ? (
                  <option value="Scheduled">Scheduled</option>
                ) : null}
                {ticketValues.type === "Change" ? (
                  <option value="Waiting for Approval">
                    Waiting for Approval
                  </option>
                ) : null}

                <option value="Waiting for 3rd Party">
                  Waiting for 3rd Party
                </option>

                <option value="Waiting for Validation">
                  Waiting for Validation
                </option>
                <option value="Canceled">Canceled</option>
                <option value="Closed">Closed</option>
                <option value="Resolved">Resolved</option>
                {ticketValues.type === "Change" ? (
                  <option value="Implemented">Implemented</option>
                ) : null}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-start mt-3 border-b-2 pb-2 sm:pb-4 sm:mt-5 border-blue-200">
            {ticketValues.involvedTeams.length
              ? ticketValues.involvedTeams.map((team, index) => {
                  return (
                    <div
                      className="flex bg-slate-700 text-white mx-1 my-1 rounded-lg px-1 hover:cursor-pointer"
                      key={index}
                    >
                      <p className="whitespace-nowrap px-1.5 py-0.5">{team}</p>
                      <MdRemoveCircle
                        className="text-[17px] mt-[3px]"
                        onClick={(e) => handleRemoveTeam(e, team)}
                      />
                    </div>
                  );
                })
              : null}
          </div>

          {ticketValues.type === "Change" ||
          ticketValues.type === "Service Request" ? (
            <div className="flex mt-5 text-sm">
              <CiSquareInfo className="text-xl text-slate-400 mr-1 mt-[2px]" />
              <p className="text-slate-400 mt-[2px]">
                Date Format is: MM/DD/YYYY, HH:MM
              </p>
            </div>
          ) : null}

          <div className="flex flex-wrap mt-0 ">
            {ticketValues.type === "Change" ? (
              <p className="text-blue-700 pr-3 mt-4">
                Implementation Start:
                <input
                  className="text-black ml-2 indent-1 border-[1px] rounded-sm"
                
                  placeholder={formatTimestamp(
                    ticketValues.implementationStart
                  )}
                  onChange={(e) =>
                    setTicketValues({
                      ...ticketValues,
                      implementationStart: new Date(e.target.value),
                    })
                  }
                ></input>
              </p>
            ) : null}
            {ticketValues.type === "Change" ? (
              <p className="text-blue-700 pr-3 mt-4">
                Implementation End:
                <input
                  className="text-black ml-2 indent-1 border-[1px] rounded-sm "
              
                  placeholder={formatTimestamp(ticketValues.implementationEnd)}
                  onChange={(e) =>
                    setTicketValues({
                      ...ticketValues,
                      implementationEnd: new Date(e.target.value),
                    })
                  }
                ></input>
              </p>
            ) : null}

            {ticketValues.type === "Service Request" ? (
              <div className="flex text-blue-700 mt-4">
                Complete By:{" "}
                <input
                  className="text-black ml-2 indent-1 border-[1px] rounded-sm"
                  type="text"
                  placeholder={formatTimestamp(ticketValues.completeBy)}
                  onChange={(e) =>
                    setTicketValues({
                      ...ticketValues,
                      completeBy: new Date(e.target.value),
                    })
                  }
                ></input>
              </div>
            ) : null}
            <p className="text-blue-700 mt-4">
              Ticket Created:
              <span className="text-black">
                {formatTimestamp(ticketValues.dateCreated)}
              </span>
            </p>
          </div>

          {ticketValues.type === "Change" ? (
            <div className="flex flex-wrap mt-2">
              <div className="flex pr-5 mt-2">
           
                <p className="text-blue-700">Emergency: </p>
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={ticketValues.emergency}
                  onChange={(e) =>
                    setTicketValues({
                      ...ticketValues,
                      emergency: !ticketValues.emergency,
                    })
                  }
                ></input>
              </div>

              <div className="flex mt-2 mr-4">
                <p className="mr-2 text-blue-700">Elevated Access Required: </p>
                <input
                  className=""
                  type="checkbox"
                  checked={ticketValues.elevatedAccess !== "" ? true : false}
                  onChange={(e) =>
                    ticketValues.elevatedAccess !== ""
                      ? setTicketValues({ ...ticketValues, elevatedAccess: "" })
                      : setTicketValues({
                          ...ticketValues,
                          elevatedAccess: "Datastage",
                        })
                  }
                ></input>
                {ticketValues.elevatedAccess !== "" ? (
                  <select
                    className="border-[1px] rounded-sm ml-2"
                    value={ticketValues.elevatedAccess}
                    onChange={(e) =>
                      setTicketValues({
                        ...ticketValues,
                        elevatedAccess: e.target.value,
                      })
                    }
                  >
                    <option value=""></option>
                    <option value="Datastage">Datastage</option>
                    <option value="Maint-TSP">Maint-DSP</option>
                    <option value="Maint-TCI">Maint-TCI</option>
                    <option value="AccountingAD">AccountingAD</option>
                  </select>
                ) : null}
              </div>

              <div className="flex mt-2">
                <p className="text-blue-700 mr-2">Master Ticket: </p>
                <input
                  className=""
                  type="checkbox"
                  checked={ticketValues.masterTicket}
                  value={ticketValues.masterTicket}
                  onChange={(e) =>
                    setTicketValues({
                      ...ticketValues,
                      masterTicket: !ticketValues.masterTicket,
                    })
                  }
                ></input>
              </div>
            </div>
          ) : null}

          <div className="flex mt-4">
            <p className="text-blue-700 mr-2">Submitter: </p>
            <p>{ticketValues.submitter}</p>
          </div>

          {ticketValues.type === "Change" ? (
            <div className="flex flex-col justify-center mt-3">
              {console.log("HERE is tasks", tasks)}
              {tasks.length
                ? tasks.map((task, index) => {
                    return (
                      <div
                        className="flex flex-col my-1 pt-1 pb-2 px-0 rounded-sm border-b-[2px] border-blue-300"
                        key={index}
                      >
                        <div className="flex pb-2">
                          <p className="mr-3 whitespace-nowrap font-semibold">
                            Task #{task.taskNumber}
                          </p>
                          <p className="overflow-hidden text-ellipsis whitespace-nowrap pr-1 text-slate-400 max-w-[300px] hidden sm:flex">
                            Complete at:
                          </p>
                          <p className="ml-1 font-semibold text-black whitespace-nowrap mr-3">
                            {formatTimestamp(task.completeBy)}
                          </p>
                          <div className="flex justify-end grow">
                            <SiMicrosoftteams className="text-blue-700 mt-1 mr-1 hidden sm:flex" />
                            <p className="mr-4 hidden sm:flex">
                              {task.assignedTeam}
                            </p>

                            {task.assignedPerson === "" ? (
                              <p className="mr-4 hidden md:flex">Unclaimed</p>
                            ) : (
                              <p className="mr-4 hidden md:flex">
                                <IoPersonCircleOutline className="text-blue-700 mt-[3px] mr-1 text-base" />
                                {task.assignedPerson}
                              </p>
                            )}
                            <p className="whitespace-nowrap text-blue-700">
                              Status:{" "}
                              <span className="text-black">{task.status}</span>
                            </p>
                          </div>
                        </div>

                        <div className=" sm:ml-10 pb-2">
                          <p className="flex-wrap whitespace-pre-line">
                            {task.description}
                          </p>
                        </div>
                      </div>
                    );
                  })
                : null}
              <div className="flex justify-center mt-3">
                <button className="px-2 py-1 border-2 border-green-500 rounded-md text-green-500 hover:cursor-pointer">
                  Add Task
                </button>
                <CiSquareInfo className="text-xl mt-[4px] ml-1 text-slate-400" />
                <p className="pl-0.5 mt-[4px] text-slate-400">
                  Assign a task directly to a team.
                </p>
              </div>
            </div>
          ) : null}

          <div className="flex">
            <textarea
              className="flex grow bg-slate-100 border-[1px] rounded-md shadow-lg mt-5 mx-2 h-[300px] overflow-y-scroll p-1"
              value={ticketValues.description}
              onChange={(e) =>
                setTicketValues({
                  ...ticketValues,
                  description: e.target.value,
                })
              }
            ></textarea>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default TicketView;
