import React, { useState, useEffect } from "react";
import { getUserTasks, claimTask } from "../api/tasks";
import { BsSortUpAlt, BsTicketDetailed } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { BiSort } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";
import moment from "moment";
import { useNavigate } from "react-router";

const TaskDashboard = ({ userData }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [sort, setSort] = useState(false);

  async function fetchUserTasks(team) {
    let fetchTasks = await getUserTasks(team);
    fetchTasks = fetchTasks.data.tasks;
    let sortedTasks = fetchTasks.sort((a, b) => a.completeBy - b.completeBy);
    setTasks(sortedTasks.reverse());
  }

  const handleTaskClaim = async (taskID, user) => {
    try {
      await claimTask(taskID, user);
      await fetchUserTasks(userData.team);
    } catch (error) {
      throw error;
    }
  };

  const handleRefreshTasks = async () => {
    await fetchUserTasks(userData.team);
  };

  const sortByCompletionDate = async () => {
    setSort(!sort);
    let reversedTasks = tasks.sort(
      (a, b) => moment(a.completeBy).toDate() - moment(b.completeBy).toDate()
    );
    if (sort) {
      setTasks(reversedTasks.reverse());
    } else {
      setTasks(reversedTasks);
    }
  };

  const formatTimestamp = async (timestamp) => {
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

  useEffect(() => {
    if (userData.team === undefined) {
      return;
    } else {
      fetchUserTasks(userData.team);
    }
  }, [userData]);

  return (
    <div className="flex flex-col grow rounded-xl overflow-hidden shadow-md border border-slate-200 bg-white">
      <div className="flex px-3 panel-header text-white py-3 border-b border-white/20 items-center">
        <FaTasks className="mr-2 text-white" />
        <p className="font-semibold text-sm tracking-wide">Assigned Tasks</p>
        <div className="flex grow justify-end items-center gap-3">
          <BiSort
            className="text-lg hover:cursor-pointer hover:text-white/70 transition-colors"
            onClick={(e) => sortByCompletionDate()}
          />
          <GrUpdate
            className="text-sm hover:cursor-pointer hover:text-white/70 transition-colors"
            onClick={handleRefreshTasks}
          />
        </div>
      </div>

      <div className="flex flex-col max-h-[650px] overflow-y-scroll scroll-smooth">
        {tasks.length ? (
          tasks.map((task, index) => {
            const completeby = formatTimestamp(task.completeBy);
            if (index % 2 === 0) {
              var elementClassname =
                "text-sm px-3 py-3 border-b border-slate-100 hover:cursor-pointer hover:bg-indigo-50 transition-colors duration-150";
            } else {
              var elementClassname =
                "text-sm px-3 py-3 border-b border-slate-100 hover:cursor-pointer bg-slate-50 hover:bg-indigo-50 transition-colors duration-150";
            }

            if (task.status === "Active") {
              var taskStatusClass =
                "flex px-3 py-0.5 text-xs border rounded-full bg-red-100 text-red-700 border-red-300 font-medium";
            } else if (task.status === "Complete") {
              var taskStatusClass =
                "flex px-3 py-0.5 text-xs border rounded-full bg-green-100 text-green-700 border-green-300 font-medium";
            } else if (task.status === "Submitted") {
              var taskStatusClass =
                "flex px-3 py-0.5 text-xs border rounded-full bg-purple-100 text-purple-700 border-purple-300 font-medium";
            } else if (task.status === "Accepted") {
              var taskStatusClass =
                "flex px-3 py-0.5 text-xs border rounded-full bg-yellow-100 text-yellow-700 border-yellow-300 font-medium";
            }

            return (
              <div
                key={index}
                className={elementClassname}
                onClick={() => navigate("/ticket/" + task.linkedTicketNumber)}
              >
                <div className="flex items-center">
                  <p className="text-indigo-500 whitespace-nowrap text-xs">
                    Task for Change:{" "}
                    <span className="text-slate-700 font-semibold">
                      #{task.linkedTicketNumber}
                    </span>
                  </p>
                  <p className="pl-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-[178px] text-slate-800 font-medium">
                    {task.title}
                  </p>
                </div>
                {task.assignedPerson === "" ? (
                  <div className="flex py-1 mt-1.5 px-0 items-center">
                    <p className="text-indigo-500 text-xs">
                      Submitter:{" "}
                      <span className="text-slate-700 font-medium">{task.submitter}</span>
                    </p>
                    <div className="flex grow justify-end">
                      <button
                        className="bg-gradient px-4 py-1 text-white rounded-full text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTaskClaim(task._id, userData.name);
                        }}
                      >
                        Claim
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex px-0 mt-2 items-center">
                    <p className="text-indigo-500 text-xs">
                      Assigned to:{" "}
                      <span className="text-slate-700 font-medium">{task.assignedPerson}</span>
                    </p>
                    <div className="flex justify-end grow">
                      <p className={taskStatusClass}>{task.status}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex justify-center py-8 text-sm text-slate-400">
            <p>You have no assigned tasks.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
