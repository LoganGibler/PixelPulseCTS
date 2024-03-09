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
  // if false, sort by completionDate. if true, reverse that order.
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
    <div className="flex flex-col md:max-w-[400px] grow md:w-[370px] lg:w-[650px]">
      <div className="flex px-3 bg-slate-700 text-white py-2 mb-1">
        <FaTasks className="mr-3 mt-1" />
        <p className="font-semibold">Assigned Tasks</p>
        <div className="flex grow justify-end mt-0.5">
          <BiSort
            className="text-lg mt-[1px] mr-2 hover:cursor-pointer"
            onClick={(e) => sortByCompletionDate()}
          />
          <GrUpdate
            className="mt-[1px] ml-0.5 hover:cursor-pointer"
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
                "text-sm px-3 py-3 border-b-[1px] hover:cursor-pointer";
            } else {
              var elementClassname =
                "text-sm px-3 py-3 border-b-[1px] hover:cursor-pointer bg-gray-200";
            }
            return (
              <div
                key={index}
                className={elementClassname}
                onClick={() => navigate("/ticket/" + task.linkedTicketNumber)}
              >
                <div className="flex">
                  <p className="text-blue-700 whitespace-nowrap">
                    Task for Change:{" "}
                    <span className="text-black">
                      #{task.linkedTicketNumber}
                    </span>
                  </p>
                  <p className="pl-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-[178px]">
                    {task.title}
                  </p>
                </div>
                {task.assignedPerson === "" ? (
                  <div className="flex py-1 mt-2 px-0">
                    <p className="text-blue-700">
                      Submitter:{" "}
                      <span className="text-black">{task.submitter}</span>
                    </p>
                    <div className="flex grow justify-end">
                      <button
                        className="bg-gradient px-3 text-white rounded-md"
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
                  <div className="flex px-0 mt-3">
                    <p className="text-blue-700">
                      Assigned to:{" "}
                      <span className="text-black">{task.assignedPerson}</span>
                    </p>
                    <div className="flex justify-end grow">
                      <p className="text-blue-700">
                        Status:
                        <span className="pl-1 text-black">{task.status}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex justify-center py-3 text-sm">
            <p>You have no assigned tasks.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
