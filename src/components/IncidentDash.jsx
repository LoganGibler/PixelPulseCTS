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
    // console.log(queriedTickets);
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
    <div className="flex justify-center grow min-h-[695px]">
      <div className="flex flex-col grow">
        <div className="flex font-semibold py-2 border-b-[2px] px-2 bg-slate-700">
          <AiOutlineTeam className="text-lg text-white mt-[2px] mr-1" />
          <h1 className="text-white">Team Incidents</h1>
          <div className="flex grow justify-end mt-1 text-white">
            <BiSort
              className="mx-1 text-lg mt-[1px] hover:cursor-pointer"
              onClick={async (e) => {
                await handleSortClick(e, "time");
              }}
            />
            <BsSortUpAlt
              className="mx-3 text-xl hover:cursor-pointer"
              onClick={async (e) => {
                await handleSortClick(e, "priority");
              }}
            />
            <GrUpdate
              className="mx-1 mt-[2px] hover:cursor-pointer"
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
                  "flex px-3 py-4 border-b-[1px] border-t-0 grow text-sm hover:cursor-pointer";
              } else {
                var elementClassname =
                  "flex px-3 py-4 border-b-[1px] border-t-0 bg-gray-200 grow text-sm hover:cursor-pointer";
              }

              if (ticket.status === "Active") {
                var ticketStatusClass =
                  "flex px-4 py-0.5 border-2 rounded-md bg-red-300 text-red-700 border-red-600 whitespace-nowrap";
              } else if (ticket.status === "Resolved") {
                var ticketStatusClass =
                  "flex px-4 py-0.5 border-2 rounded-md bg-green-300 text-green-700 border-green-600 whitespace-nowrap";
              } else if (ticket.status === "Submitted") {
                var ticketStatusClass =
                  "flex px-4 py-0.5 border-2 rounded-md bg-purple-300 text-purple-700 border-purple-600 whitespace-nowrap";
              } else if (ticket.status === "Waiting for 3rd Party") {
                var ticketStatusClass =
                  "flex px-4 py-0.5 border-2 rounded-md bg-yellow-300 text-yellow-700 border-yellow-600 whitespace-nowrap";
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
                      {" "}
                      <p className="pr-3">#{ticket.ticketNumber}</p>
                      <p className="truncated-text-sm pr-1.5 font-semibold">
                        {ticket.title}
                      </p>
                      {ticket.userAssigned !== "" ? (
                        <div className="flex grow justify-end">
                          <div>
                            {" "}
                            <p className={ticketStatusClass}>{ticket.status}</p>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-2 flex grow justify-end">
                      {ticket.priority === "1" ? (
                        <Bs1SquareFill className="mt-0.5 mr-3 text-lg text-red-700" />
                      ) : null}
                      {ticket.priority === "2" ? (
                        <Bs2SquareFill className="mt-0.5 mr-3 text-lg text-blue-800" />
                      ) : null}
                      {ticket.priority === "3" ? (
                        <Bs3SquareFill className="mt-0.5 mr-3 text-lg text-yellow-500" />
                      ) : null}
                      {ticket.priority === "4" ? (
                        <Bs4SquareFill className="mt-0.5 mr-3 text-lg text-green-600" />
                      ) : null}
                      {ticket.userAssigned != "" ? (
                        <p className="text-ellipsis text-blue-700 overflow-hidden max-w-[200px] text-xs mt-0.5 whitespace-nowrap">
                          Assigned To:{" "}
                          <span className="font-semibold text-black">
                            {" "}
                            {ticket.userAssigned}
                          </span>
                        </p>
                      ) : (
                        <p className="text-ellipsis text-blue-500 overflow-hidden max-w-[200px] text-xs mt-0.5 whitespace-nowrap">
                          Submitted by:{" "}
                          <span className="text-black font-semibold">
                            {ticket.submitter}
                          </span>
                        </p>
                      )}

                      {ticket.userAssigned !== "" ? (
                        <div className="hidden lg:flex pl-8">
                          <p className="text-blue-700">
                            Assigned Team:{" "}
                            <span className="text-black font-semibold pl-1">
                              {ticket.team}
                            </span>
                          </p>
                        </div>
                      ) : null}

                      {ticket.userAssigned !== "" ? (
                        <div className="flex justify-end grow">
                          <FaRegClock className="text-slate-600 mt-[4px] mr-1" />
                          <p className="flex">{ticketCreationDate}</p>
                        </div>
                      ) : (
                        <div className="flex justify-end grow"></div>
                      )}

                      {ticket.userAssigned === "" ? (
                        <div className="flex grow justify-end">
                          <button
                            className="py-0 px-4 border-[1px] font-semibold rounded-lg bg-gradient text-white hover:cursor-pointer"
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
            <div className="flex justify-center mt-4">
              <p>There are no incidents assigned to your team.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentDash;
