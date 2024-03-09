import React from "react";

const ChangeTasks = ({
  userData,
  companyTeams,
  tasks,
  handleUpdateTask,
  fetchTicketInfo,
  formatTimestamp,
  createTaskActive,
  setCreateTaskActive,
}) => {
  return (
    <div className="flex flex-col grow">
      {tasks.length ? (
        tasks.map((task, index) => {
          if (task.status === "Active") {
            var taskStatusClass =
              "bg-red-300 border-2 text-red-500 border-red-500  rounded-md px-0.5 sm:px-3 text-center py-[1px] font-bold hover:cursor-pointer text-xs sm:text-sm";
          } else if (task.status === "Complete") {
            var taskStatusClass =
              "bg-green-100 border-2 text-green-600 border-green-500  rounded-md px-0.5 sm:px-3 text-center py-[1px] font-bold hover:cursor-pointer text-xs sm:text-sm";
          } else if (task.status === "Accepted") {
            var taskStatusClass =
              "bg-yellow-100 border-2 text-yellow-500 border-yellow-500  rounded-md px-0.5 sm:px-3 text-center py-[1px] font-bold hover:cursor-pointer text-xs sm:text-sm";
          } else if (task.status === "Submitted") {
            var taskStatusClass =
              "bg-purple-300 border-2 text-purple-500 border-purple-600  rounded-md px-0.5 sm:px-3 text-center py-[1px] font-bold hover:cursor-pointer text-xs sm:text-sm";
          }

          console.log(task);

          return (
            <div
              key={index}
              className="flex flex-col grow bg-slate-700 text-slate-100 pb-1 py-2 my-1 px-3 rounded-md text-sm"
            >
              <div className="flex">
                <div className="flex">
                  <p className="mr-6 whitespace-nowrap hidden sm:flex">
                    Task #{index + 1}
                  </p>
                  <p className="font-semibold whitespace-nowrap mr-1 mt-[1px]">
                    {task.assignedTeam}
                  </p>
                </div>
                <div className="flex justify-end grow">
                  {formatTimestamp(task.completeBy) ===
                  "12/31/1969, 7:00 PM" ? (
                    <div className="mr-1 flex whitespace-nowrap mt-[1px]">
                      <span className="hidden sm:flex mr-1">Complete: </span>
                      <span className="font-semibold">In Succession</span>
                    </div>
                  ) : (
                    <div className="pr-1 flex whitespace-nowrap">
                      <p className="hidden sm:flex mt-[1px] mr-1">
                        Complete at:{" "}
                      </p>

                      <p className="font-semibold mt-[1px]">
                        {formatTimestamp(task.completeBy)}
                      </p>
                    </div>
                  )}

                  <div className="sm:ml-3">
                    <select
                      className={taskStatusClass}
                      value={task.status}
                      onChange={(e) => {
                        handleUpdateTask(e.target.value, task._id);
                        fetchTicketInfo();
                      }}
                    >
                      <option className="bg-white text-black" value="Submitted">
                        Submitted
                      </option>
                      <option className="bg-white text-black" value="Active">
                        Active
                      </option>
                      <option className="bg-white text-black" value="Complete">
                        Complete
                      </option>
                      <option className="bg-white text-black" value="Accepted">
                        Accepted
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <p className="px-5 mt-2 mb-2 whitespace-pre-wrap">
                {task.description}
              </p>
            </div>
          );
        })
      ) : (
        <div>No tasks created.</div>
      )}
    </div>
  );
};

export default ChangeTasks;
