import React, { useState, useEffect } from "react";
import { createTask } from "../api/tasks";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BiSolidInfoSquare } from "react-icons/bi";

const CreateTask = ({
  ticketNumber,
  companyTeams,
  onClick,
  setCreateTaskActive,
  userData,
  fetchTicketInfo,
}) => {
  const [assignedTeam, setAssignedTeam] = useState("DatacenterOps");
  const [description, setDescription] = useState("");
  const [completeBy, setCompleteBy] = useState(null);
  const [submittedBy, setSubmittedBy] = useState("");
  return (
    <form
      className="flex flex-col bg-slate-700 rounded-sm p-2 mt-2 absolute z-10 top-[100px] sm:top-[200px] sm:max-w-[430px]"
      onClick={onClick}
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const newTask = await createTask(
            ticketNumber,
            assignedTeam,
            description,
            completeBy,
            userData.name
          );

          if (newTask) {
            setCreateTaskActive(false);
            fetchTicketInfo();
          } else {
            alert(
              "Failed to create task. Please contact administrator for troubleshooting."
            );
          }
        } catch (error) {
          throw error;
        }
      }}
    >
      <div className="flex px-2 text-white">
        {" "}
        Assign Team:{" "}
        <select
          className="px-1 rounded-md ml-2 text-black"
          onChange={(e) => setAssignedTeam(e.target.value)}
        >
          {companyTeams.map((team, index) => {
            if (index === 0) {
              return;
            }

            return (
              <option key={index} value={team}>
                {team}
              </option>
            );
          })}
        </select>
      </div>
      <textarea
        className="bg-slate-100 mx-2 px-1 py-0.5 mt-2 text-black h-[200px] sm:w-[400px] rounded-sm"
        placeholder="What does this team need to complete?"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="flex px-2 text-white mt-2">
        {" "}
        Complete By:{" "}
        <input
          type="datetime-local"
          className="px-1 ml-2 rounded-md text-black"
          onChange={(e) => {
            setCompleteBy(e.target.value);
          }}
        />
      </div>

      <div className="flex px-2 text-center text-white mt-2 text-sm">
        <BiSolidInfoSquare className="text-xl mr-1" />{" "}
        <p className="">
          If Date is left blank, task completion date will default to "Complete
          after previous step".
        </p>
      </div>
      <div className="flex mt-3">
        <IoIosCloseCircleOutline
          className="text-2xl mt-1.5 text-red-200 hover:cursor-pointer"
          onClick={() => setCreateTaskActive(false)}
        />

        <div className="flex justify-end grow">
          <button className="bg-green-200 text-green-500 px-3 py-1 rounded-md border-2 border-green-600">
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateTask;
