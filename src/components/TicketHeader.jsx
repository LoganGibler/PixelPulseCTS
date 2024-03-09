import React from "react";
import { HiTicket } from "react-icons/hi2";
import { MdRemoveCircle } from "react-icons/md";
import { updateTicket } from "../api/tickets";

const TicketHeader = ({
  userData,
  ticketValues,
  setTicketValues,
  companyTeams,
  setCreateTaskActive,
  handleRemoveTeam,
  handleAddTeamClick,
  fetchTicketInfo,
}) => {
  return (
    <div className="flex border-b-2 px-3 pb-3 mt-2 shadow-lg border-blue-500">
      <HiTicket className="text-xl mt-[6px] mr-1 hidden sm:flex" />
      <div className="mt-1">
        <select
          className="flex hover:cursor-pointer font-semibold bg-inherit"
          value={ticketValues.type}
          onChange={(e) =>
            setTicketValues({ ...ticketValues, type: e.target.value })
          }
        >
          <option value="Change">Request for Change</option>
          <option value="Incident">Incident</option>
          <option value="Service Request">Service Request</option>
          <option value="Event">Event</option>
        </select>
      </div>
      <p className="font-semibold mt-[4px] ml-2 mr-3">
        #{ticketValues.ticketNumber}
      </p>

      <div className="hidden lg:flex flex-wrap grow justify-center">
        <div className="mt-0.5">
          <select
            className="w-[100px] bg-slate-200 px-1 py-[2px] rounded-md"
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
                <div key={index}>
                  {" "}
                  <p className="text-sm mt-[1px] py-[3px] flex mx-[0px] border-[1px] bg-slate-700 text-white px-2 rounded-lg">
                    {team}
                    <MdRemoveCircle
                      className="ml-1 mt-1 hover:cursor-pointer"
                      onClick={(e) => handleRemoveTeam(e, team)}
                    />
                  </p>
                </div>
              );
            })
          : null}
      </div>

      <div className="flex justify-end mt-1 grow">
        <div>
          {" "}
          <button
            className=" px-3 border-2 border-green-500 rounded-md text-green-500 hover:cursor-pointer whitespace-nowrap"
            onClick={async () => {
              await updateTicket(ticketValues, userData.name);
              fetchTicketInfo(ticketValues.ticketNumber);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketHeader;
