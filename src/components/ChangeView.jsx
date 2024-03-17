import React, { useState } from "react";
import TicketHeader from "./TicketHeader";
import CreateTask from "./CreateTask";
import TicketComments from "./TicketComments";
import { getTicketTasks, updateTaskStatus } from "../api/tasks";
import { LuTrash2 } from "react-icons/lu";
import { MdRemoveCircle } from "react-icons/md";
import SelectFooterType from "./SelectFooterType";
import AuditLog from "./AuditLog";
import ChangeTasks from "./ChangeTasks";
import UploadFile from "./UploadFile";
import TicketAttachments from "./TicketAttachments";
import moment from "moment-timezone";

const ChangeView = ({
  userData,
  companyTeams,
  ticketValues,
  setTicketValues,
  tasks,
  setTasks,
  handleAddTeamClick,
  handleAddTeam,
  handleRemoveTeam,
  formatTimestamp,
  handleUpdateTask,
  fetchTicketInfo,
  handleTaskDelete,
  activeTicketFooter,
  setActiveTicketFooter,
}) => {
  const [createTaskActive, setCreateTaskActive] = useState(false);
  const [createCommentActive, setCreateCommentActive] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  if (ticketValues.status === "Active") {
    var ticketStatusClass =
      "bg-red-300 border-2 text-red-500 border-red-500  rounded-md px-1 text-center py-[1px] font-bold hover:cursor-pointer";
  } else if (ticketValues.status === "Complete") {
    var ticketStatusClass =
      "bg-green-100 border-2 text-green-600 border-green-500  rounded-md px-1 text-center py-[1px] font-bold hover:cursor-pointer";
  } else if (ticketValues.status === "Accepted") {
    var ticketStatusClass =
      "bg-yellow-100 border-2 text-yellow-500 border-yellow-500  rounded-md px-1 text-center py-[1px] font-bold hover:cursor-pointer";
  } else if (ticketValues.status === "Submitted") {
    var ticketStatusClass =
      "bg-purple-300 border-2 text-purple-500 border-purple-600  rounded-md px-1 text-center py-[1px] font-bold hover:cursor-pointer";
  } else if (ticketValues.status === "PendingApproval") {
    var ticketStatusClass =
      "bg-orange-200 border-2 text-orange-500 border-orange-600  rounded-md px-1 text-center py-[1px] font-bold hover:cursor-pointer";
  } else if (ticketValues.status === "Closed") {
    var ticketStatusClass =
      "bg-stone-700 border-2 text-stone-100 border-stone-600  rounded-md px-1 text-center py-[1px] font-bold hover:cursor-pointer";
  }

  const implementationStartDate = new Date(ticketValues.implementationStart);
  const implementationStartEST = moment
    .tz(implementationStartDate, "America/New_York")
    .format("YYYY-MM-DDTHH:mm");

  const implementationEndDate = new Date(ticketValues.implementationEnd);
  const implementationEndEST = moment
    .tz(implementationEndDate, "America/New_York")
    .format("YYYY-MM-DDTHH:mm");

  // console.log(implementationEndEST, implementationStartEST);

  return (
    <div className="bg-slate-50 grow flex flex-col py-2 sm:mx-2 mx-0">
      <TicketHeader
        userData={userData}
        ticketValues={ticketValues}
        setTicketValues={setTicketValues}
        companyTeams={companyTeams}
        setCreateTaskActive={setCreateTaskActive}
        handleRemoveTeam={handleRemoveTeam}
        handleAddTeamClick={handleAddTeamClick}
        fetchTicketInfo={fetchTicketInfo}
      />
      <div className="flex">
        <div className="flex flex-col grow min-h-screen md:px-[4rem] px-[0.5rem]">
          <div className="text-lg flex flex-col">
            <div className="flex grow mt-6 text-sm sm:text-base">
              <p className="pr-2 whitespace-nowrap mt-[2px] font-bold hidden sm:flex">
                {ticketValues.type}
              </p>
              <p className=" font-bold mt-[1.5px] mr-2">
                #{ticketValues.ticketNumber}
              </p>

              <input
                className="flex grow bg-slate-200 px-3 overflow-hidden border-2 border-slate-300 rounded-md text-ellipsis w-100%"
                value={ticketValues.title}
                onChange={(e) =>
                  setTicketValues({ ...ticketValues, title: e.target.value })
                }
              ></input>
            </div>
            <div className="flex flex-wrap flex-col md:flex-row text-sm mt-10">
              <div className="mb-5 mr-4">
                <select
                  className={ticketStatusClass}
                  onChange={(e) =>
                    setTicketValues({ ...ticketValues, status: e.target.value })
                  }
                >
                  <option value="Submitted" className="bg-slate-100 text-black">
                    Submitted
                  </option>
                  <option value="Accepted" className="bg-slate-100 text-black">
                    Accepted
                  </option>
                  <option value="Active" className="bg-slate-100 text-black">
                    Active
                  </option>
                  <option value="Complete" className="bg-slate-100 text-black">
                    Complete
                  </option>
                  <option
                    value="PendingApproval"
                    className="bg-slate-100 text-black"
                  >
                    PendingApproval
                  </option>
                  <option value="Closed" className="bg-slate-100 text-black">
                    Closed
                  </option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row">
                <div className="flex mt-0">
                  <p className="mr-1 text-blue-700 mt-[2px] whitespace-nowrap">
                    Start Date:{" "}
                  </p>
                  <div>
                    <input
                      className="mr-3 bg-slate-200 px-2 rounded-md border-2 border-slate-300 hover:cursor-pointer"
                      type="datetime-local"
                      value={
                        ticketValues.implementationEnd
                          ? implementationStartEST
                          : ""
                      }
                      onChange={(e) =>
                        setTicketValues({
                          ...ticketValues,
                          implementationStart: e.target.value,
                        })
                      }
                    ></input>
                  </div>
                </div>

                <div className="flex mt-2 sm:mt-0">
                  <p className="mr-[8px] text-blue-700 mt-[2px] whitespace-nowrap">
                    End Date:{" "}
                  </p>
                  <div>
                    <input
                      className=" bg-slate-200 px-2 rounded-md border-2 border-slate-300 hover:cursor-pointer"
                      type="datetime-local"
                      value={
                        ticketValues.implementationEnd
                          ? implementationEndEST
                          : ""
                      }
                      onChange={(e) => {
                        setTicketValues({
                          ...ticketValues,
                          implementationEnd: e.target.value,
                        });
                        console.log(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex lg:hidden flex-wrap mt-7 text-sm">
              <div className="mt-[6px]">
                <select
                  className="w-[140px] bg-slate-200 rounded-md px-1 mr-2 py-[3px]"
                  onChange={(e) => handleAddTeamClick(e, e.target.value)}
                  value={companyTeams[0]}
                >
                  {companyTeams.length
                    ? companyTeams.map((team, index) => {
                        if (ticketValues.involvedTeams.includes(team)) {
                          return;
                        }
                        return (
                          <option value={team} key={index}>
                            {team}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>

              {ticketValues.involvedTeams.length
                ? ticketValues.involvedTeams.map((team, index) => {
                    return (
                      <p
                        className="text-sm my-[5px] py-[3px] flex mx-1 border-[1px] bg-slate-700 text-white px-2 rounded-lg"
                        key={index}
                      >
                        {team}
                        <MdRemoveCircle
                          className="ml-1 mt-1 hover:cursor-pointer"
                          onClick={(e) => handleRemoveTeam(e, team)}
                        />
                      </p>
                    );
                  })
                : null}
            </div>

            <div className="flex mt-5">
              <textarea
                className="bg-slate-200 text-sm rounded-md py-1 px-2 grow min-h-[250px] border-2 border-slate-300"
                value={ticketValues.description}
                placeholder="Enter Change details here."
                maxLength={2000}
                onChange={(e) =>
                  setTicketValues({
                    ...ticketValues,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>

            <div className="flex flex-wrap mt-6 text-sm">
              <div className="flex mr-4 my-3">
                <p className="flex mr-2 text-blue-700">Emergency: </p>
                <input
                  type="checkbox"
                  className="hover:cursor-pointer"
                  checked={ticketValues.emergency}
                  onChange={(e) =>
                    setTicketValues({
                      ...ticketValues,
                      emergency: !ticketValues.emergency,
                    })
                  }
                ></input>
              </div>
              <div className="flex mr-3 my-3">
                <p className="text-blue-700 mr-2">Master Ticket: </p>
                <input
                  className="hover:cursor-pointer"
                  type="checkbox"
                  checked={ticketValues.masterTicket}
                  onChange={(e) =>
                    setTicketValues({
                      ...ticketValues,
                      masterTicket: !ticketValues.masterTicket,
                    })
                  }
                ></input>
              </div>
              <div className="flex my-3">
                <p className="text-blue-700 mr-2">Elevated Access: </p>
                <input
                  type="checkbox"
                  className="hover:cursor-pointer mr-2"
                  checked={ticketValues.elevatedAccess === "" ? false : true}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setTicketValues({
                      ...ticketValues,
                      elevatedAccess: isChecked ? "ADGroupOne" : "", // You may adjust the value accordingly
                    });
                  }}
                ></input>
                {ticketValues.elevatedAccess !== "" ? (
                  <select
                    className="bg-slate-200 px-2 rounded-md ml-2 mr-2 hover:cursor-pointer"
                    value={ticketValues.elevatedAccess}
                    onChange={(e) =>
                      setTicketValues({
                        ...ticketValues,
                        elevatedAccess: e.target.value,
                      })
                    }
                  >
                    <option value=""></option>
                    <option value="ADGroupOne">ADGroupOne</option>
                    <option value="ADGroupTwo">ADGroupTwo</option>
                    <option value="ADGroupThree">ADGroupThree</option>
                    <option value="ADGroupFour">ADGroupFour</option>
                  </select>
                ) : null}
              </div>
              <p className="text-blue-700 mt-[12px] ml-0 whitespace-nowrap">
                Submitter:{" "}
                <span className="text-black"> {ticketValues.submitter}</span>
              </p>
            </div>
            <TicketAttachments
              ticketNumber={ticketValues.ticketNumber}
              uploadComplete={uploadComplete}
              setUploadComplete={setUploadComplete}
            />
            <UploadFile
              ticketNumber={ticketValues.ticketNumber}
              fetchTicketInfo={fetchTicketInfo}
              setUploadComplete={setUploadComplete}
              uploadComplete={uploadComplete}
            />
            <div className="flex pb-4 border-b-2 mb-2 border-blue-700">
              <SelectFooterType
                activeTicketFooter={activeTicketFooter}
                setActiveTicketFooter={setActiveTicketFooter}
                setCreateCommentActive={setCreateCommentActive}
                type={ticketValues.type}
                createTaskActive={createTaskActive}
                setCreateTaskActive={setCreateTaskActive}
                fetchTicketInfo={fetchTicketInfo}
              />
            </div>
          </div>
          <div className="flex justify-center">
            {activeTicketFooter === "Comments" ? (
              <TicketComments
                ticketNumber={ticketValues.ticketNumber}
                formatTimestamp={formatTimestamp}
                userData={userData}
                createCommentActive={createCommentActive}
                setCreateCommentActive={setCreateCommentActive}
              />
            ) : null}
            {activeTicketFooter === "Tasks" ? (
              <ChangeTasks
                userData={userData}
                companyTeams={companyTeams}
                tasks={tasks}
                handleUpdateTask={handleUpdateTask}
                fetchTicketInfo={fetchTicketInfo}
                formatTimestamp={formatTimestamp}
                createTaskActive={createCommentActive}
                setCreateTaskActive={setCreateTaskActive}
              />
            ) : null}
            {activeTicketFooter === "AuditLog" ? (
              <AuditLog auditLog={ticketValues.auditString} />
            ) : null}
          </div>
        </div>

        <div className="justify-end bg-slate-50 hidden xl:flex">
          <div className="flex flex-col min-w-[350px] overflow-y-scroll max-h-screen top-0 bottom-0 sticky  pt-3 changetask-shadow">
            {tasks.length ? (
              tasks.map((task, index) => {
                if (task.status === "Active") {
                  var taskStatusClass =
                    "bg-red-300 border-2 text-red-500 border-red-500  rounded-md px-3 text-center py-[1px] font-bold hover:cursor-pointer";
                } else if (task.status === "Complete") {
                  var taskStatusClass =
                    "bg-green-100 border-2 text-green-600 border-green-500  rounded-md px-3 text-center py-[1px] font-bold hover:cursor-pointer";
                } else if (task.status === "Accepted") {
                  var taskStatusClass =
                    "bg-yellow-100 border-2 text-yellow-500 border-yellow-500  rounded-md px-3 text-center py-[1px] font-bold hover:cursor-pointer";
                } else if (task.status === "Submitted") {
                  var taskStatusClass =
                    "bg-purple-300 border-2 text-purple-500 border-purple-600  rounded-md px-3 text-center py-[1px] font-bold hover:cursor-pointer";
                }

                return (
                  <div
                    key={index}
                    className="max-w-[400px] text-sm mb-3 border-b-2 pb-4 border-slate-300"
                  >
                    <div className="flex py-2 font-bold">
                      <p className="w-[80px] text-center mt-[2px]">
                        Task #{index + 1}
                      </p>
                      <p className="flex mt-[2px] whitespace-nowrap">
                        {task.assignedTeam}
                      </p>
                      <div className="flex justify-end grow px-3.5 font-normal">
                        <select
                          className={taskStatusClass}
                          value={task.status}
                          onChange={(e) => {
                            handleUpdateTask(e.target.value, task._id);
                            fetchTicketInfo();
                          }}
                        >
                          <option
                            className="bg-white text-black"
                            value="Submitted"
                          >
                            Submitted
                          </option>
                          <option
                            className="bg-white text-black"
                            value="Active"
                          >
                            Active
                          </option>
                          <option
                            className="bg-white text-black"
                            value="Complete"
                          >
                            Complete
                          </option>
                          <option
                            className="bg-white text-black"
                            value="Accepted"
                          >
                            Accepted
                          </option>
                        </select>
                      </div>
                    </div>
                    <p className="whitespace-pre-wrap px-3.5 text-sm">
                      {task.description}
                    </p>
                    <div className="flex mt-4 py-1">
                      {formatTimestamp(task.completeBy) ===
                      "12/31/1969, 7:00 PM" ? (
                        <p className="text-blue-700 font-bold px-3.5 mt-[4px]">
                          Complete:{" "}
                          <span className="text-black">In Succession</span>
                        </p>
                      ) : (
                        <p className="text-blue-500 px-3.5 mt-[4px] font-bold">
                          Complete at:{" "}
                          <span className="text-black">
                            {formatTimestamp(task.completeBy)}
                          </span>
                        </p>
                      )}

                      <div className="flex justify-end grow mr-4">
                        {userData.team.includes(task.assignedTeam) ? (
                          <button
                            className="flex border-2 border-red-600 px-2 text-red-500 bg-red-200 py-0.5 rounded-md"
                            onClick={(e) => {
                              handleTaskDelete(task._id);
                              fetchTicketInfo();
                            }}
                          >
                            Delete Task
                            <LuTrash2 className="text-base ml-1 mt-[2px]" />
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center my-3">
                <p>No tasks have been created yet.</p>
              </div>
            )}
            {!createTaskActive ? (
              <div className="flex text-sm justify-center py-1 mx-3">
                <button
                  className="border-2 border-green-500 px-2 py-0.5 rounded-md bg-green-100 text-green-600"
                  onClick={(e) => setCreateTaskActive(true)}
                >
                  Create Task
                </button>
                <p className="mt-[3px] ml-2">
                  Assign a task directly to a team
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {createTaskActive ? (
        <div
          className="overlay1 flex justify-center"
          onClick={(e) => {
            e.stopPropagation();
            setCreateTaskActive(false);
          }}
        >
          {createTaskActive ? (
            <CreateTask
              companyTeams={companyTeams}
              ticketNumber={ticketValues.ticketNumber}
              onClick={(e) => e.stopPropagation()}
              setCreateTaskActive={setCreateTaskActive}
              userData={userData}
              fetchTicketInfo={fetchTicketInfo}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default ChangeView;
