import React, { useState, useEffect } from "react";
import { getTeamsTickets, claimTicket } from "../api/tickets";
import {
  Bs1SquareFill,
  Bs2SquareFill,
  Bs3SquareFill,
  Bs4SquareFill,
} from "react-icons/bs";

import { FaRegClock } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { BiSort } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { BsSortUpAlt } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import moment from "moment";
import { useNavigate } from "react-router";

const IncidentDash = ({ userData }) => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [sort, setSort] = useState(false);
  const [priority, setPriority] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchTeamsIncidents(userData) {
    const queriedTickets = await getTeamsTickets("Incident", userData);
    setTickets(queriedTickets);
  }

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

  async function handleSortClick(e, sortType) {
    if (sortType === "priority") {
      setPriority(!priority);
      const sortedTickets = [...tickets].sort(
        (a, b) => parseInt(a.priority, 10) - parseInt(b.priority, 10)
      );
      priority ? sortedTickets.reverse() : null;
      setTickets(sortedTickets);
    }

    if (sortType === "time") {
      setSort(!sort);
      const sortedTickets = [...tickets].sort(
        (a, b) =>
          moment(a.dateCreated).toDate() - moment(b.dateCreated).toDate()
      );

      sort ? sortedTickets.reverse() : null;
      setTickets(sortedTickets);
    }
  }

  useEffect(() => {
    fetchTeamsIncidents(userData);
    setIsLoading(false);
  }, [userData]);

  return (
    <div className="flex justify-center grow min-h-[695px] rounded-xl overflow-hidden shadow-md border border-slate-200 bg-white">
      <div className="flex flex-col grow">
        <div className="flex font-semibold py-3 px-3 panel-header border-b border-white/20">
          <AiOutlineTeam className="text-lg text-white mt-[2px] mr-2" />
          <h1 className="text-white text-sm font-semibold tracking-wide">Team Incidents</h1>
          <div className="flex grow justify-end mt-0.5 text-white gap-3">
            <BiSort
              className="text-lg hover:cursor-pointer hover:text-white/70 transition-colors"
              onClick={async (e) => {
                await handleSortClick(e, "time");
              }}
            />
            <BsSortUpAlt
              className="text-xl hover:cursor-pointer hover:text-white/70 transition-colors"
              onClick={async (e) => {
                await handleSortClick(e, "priority");
              }}
            />
            <GrUpdate
              className="text-sm mt-[2px] hover:cursor-pointer hover:text-white/70 transition-colors"
              onClick={async (e) => await fetchTeamsIncidents(userData)}
            />
          </div>
        </div>

        <div className="max-h-[650px] overflow-y-scroll">
          {tickets ? (
            tickets.map((ticket, index) => {
              const ticketCreationDate = formatTimestamp(ticket.dateCreated);
              if (index % 2 === 0) {
                var elementClassname =
                  "flex px-3 py-4 border-b border-slate-100 grow text-sm hover:cursor-pointer hover:bg-indigo-50 transition-colors duration-150";
              } else {
                var elementClassname =
                  "flex px-3 py-4 border-b border-slate-100 bg-slate-50 grow text-sm hover:cursor-pointer hover:bg-indigo-50 transition-colors duration-150";
              }

              if (ticket.status === "Active") {
                var ticketStatusClass =
                  "flex px-3 py-0.5 border rounded-full bg-red-100 text-red-700 border-red-300 whitespace-nowrap text-xs font-medium";
              } else if (ticket.status === "Resolved") {
                var ticketStatusClass =
                  "flex px-3 py-0.5 border rounded-full bg-green-100 text-green-700 border-green-300 whitespace-nowrap text-xs font-medium";
              } else if (ticket.status === "Submitted") {
                var ticketStatusClass =
                  "flex px-3 py-0.5 border rounded-full bg-purple-100 text-purple-700 border-purple-300 whitespace-nowrap text-xs font-medium";
              } else if (ticket.status === "Waiting for 3rd Party") {
                var ticketStatusClass =
                  "flex px-3 py-0.5 border rounded-full bg-yellow-100 text-yellow-700 border-yellow-300 whitespace-nowrap text-xs font-medium max-w-[120px] sm:max-w-[200px] overflow-hidden text-ellipsis";
              }

              if (ticket.status === "Closed") {
                return;
              }
              return (
                <div
                  className={elementClassname}
                  key={index}
                  onClick={() => navigate("/ticket/" + ticket.ticketNumber)}
                >
                  <div className="flex flex-col grow">
                    <div className="flex">
                      <p className="pr-3 text-slate-400 font-medium">#{ticket.ticketNumber}</p>
                      <p className="truncated-text-sm pr-1.5 font-semibold text-slate-800">
                        {ticket.title}
                      </p>
                      {ticket.userAssigned !== "" ? (
                        <div className="flex grow justify-end">
                          <div>
                            <p className={ticketStatusClass}>{ticket.status}</p>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-2 flex grow justify-end items-center">
                      {ticket.priority === "1" ? (
                        <Bs1SquareFill className="mr-3 text-base text-red-500 flex-shrink-0" />
                      ) : null}
                      {ticket.priority === "2" ? (
                        <Bs2SquareFill className="mr-3 text-base text-blue-600 flex-shrink-0" />
                      ) : null}
                      {ticket.priority === "3" ? (
                        <Bs3SquareFill className="mr-3 text-base text-yellow-500 flex-shrink-0" />
                      ) : null}
                      {ticket.priority === "4" ? (
                        <Bs4SquareFill className="mr-3 text-base text-green-500 flex-shrink-0" />
                      ) : null}
                      {ticket.userAssigned != "" ? (
                        <p className="text-ellipsis text-indigo-500 overflow-hidden max-w-[200px] text-xs whitespace-nowrap">
                          Assigned To:{" "}
                          <span className="font-semibold text-slate-700">
                            {ticket.userAssigned}
                          </span>
                        </p>
                      ) : (
                        <p className="text-ellipsis text-indigo-500 overflow-hidden max-w-[200px] text-xs whitespace-nowrap">
                          Submitted by:{" "}
                          <span className="text-slate-700 font-semibold">
                            {ticket.submitter}
                          </span>
                        </p>
                      )}

                      {ticket.userAssigned !== "" ? (
                        <div className="hidden lg:flex pl-8">
                          <p className="text-indigo-500 text-xs">
                            Team:{" "}
                            <span className="text-slate-700 font-semibold pl-1">
                              {ticket.team}
                            </span>
                          </p>
                        </div>
                      ) : null}

                      {ticket.userAssigned !== "" ? (
                        <div className="flex justify-end grow items-center">
                          <FaRegClock className="text-slate-400 mr-1 text-xs" />
                          <p className="flex text-xs text-slate-500">{ticketCreationDate}</p>
                        </div>
                      ) : (
                        <div className="flex justify-end grow"></div>
                      )}

                      {ticket.userAssigned === "" ? (
                        <div className="flex grow justify-end">
                          <button
                            className="px-4 py-1 font-semibold rounded-full bg-gradient text-white text-xs hover:cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
                            onClick={async (e) => {
                              e.stopPropagation();
                              await claimTicket(ticket._id, userData);
                              await fetchTeamsIncidents(userData);
                            }}
                          >
                            Claim
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center mt-8 text-slate-400 text-sm">
              <p>No incidents assigned to your team.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentDash;
