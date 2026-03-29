import React, { useState, useEffect } from "react";
import { GrUpdate } from "react-icons/gr";
import { BiSort } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { BsSortUpAlt } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { getTeamsTickets } from "../api/tickets";
import { TbExchange } from "react-icons/tb";
import { TbAlertTriangle } from "react-icons/tb";
import { useNavigate } from "react-router";
import { getAllUnresolvedTickets } from "../api/tickets";
import moment from "moment";

const ChangeDashboard = ({ userData }) => {
  const navigate = useNavigate();
  const [changeTickets, setChangeTickets] = useState([]);
  const [sort, setSort] = useState(false);

  async function fetchChangeTickets(type, userData) {
    const tickets = await getAllUnresolvedTickets("Change");
    if (tickets === undefined || tickets.length === 0) {
      return;
    }
    const sortedTickets = tickets.sort(
      (a, b) =>
        moment(a.implementationStart).toDate() -
        moment(b.implementationStart).toDate()
    );
    setChangeTickets(sortedTickets);
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

  const sortByDate = async () => {
    setSort(!sort);
    const sortedTickets = changeTickets.sort(
      (a, b) =>
        moment(a.implementationStart).toDate() -
        moment(b.implementationStart).toDate()
    );
    if (sort) {
      setChangeTickets(sortedTickets.reverse());
    } else {
      setChangeTickets(sortedTickets);
    }
  };

  useEffect(() => {
    fetchChangeTickets("Change", userData);
  }, [userData]);

  return (
    <div className="flex flex-col grow rounded-xl overflow-hidden shadow-md border border-slate-200 bg-white min-h-[700px]">
      <div className="panel-header px-3 py-3 flex items-center border-b border-white/20">
        <TbExchange className="text-lg text-white mr-2" />
        <p className="font-semibold text-white text-sm tracking-wide">Changes This Week</p>
        <div className="flex grow justify-end items-center gap-3">
          <BiSort
            className="text-lg text-white hover:cursor-pointer hover:text-white/70 transition-colors"
            onClick={sortByDate}
          />
          <GrUpdate
            className="text-sm text-white hover:cursor-pointer hover:text-white/70 transition-colors"
            onClick={() => fetchChangeTickets("Change", userData)}
          />
        </div>
      </div>

      <div className="max-h-[650px] overflow-y-scroll">
        {changeTickets.length ? (
          changeTickets.map((ticket, index) => {
            if (index % 2 === 0) {
              var elementClassname =
                "flex flex-col text-sm px-3 py-3 border-b border-slate-100 text-slate-800 hover:cursor-pointer hover:bg-indigo-50 transition-colors duration-150";
            } else {
              var elementClassname =
                "flex flex-col text-sm px-3 py-3 border-b border-slate-100 text-slate-800 hover:cursor-pointer bg-slate-50 hover:bg-indigo-50 transition-colors duration-150";
            }
            const ticketStartDate = formatTimestamp(ticket.implementationStart);

            if (ticket.status === "Active") {
              var ticketStatusClass =
                "flex px-3 py-0.5 border rounded-full bg-red-100 text-red-700 border-red-300 text-xs font-medium";
            } else if (ticket.status === "Complete") {
              var ticketStatusClass =
                "flex px-3 py-0.5 border rounded-full bg-green-100 text-green-700 border-green-300 text-xs font-medium";
            } else if (ticket.status === "Submitted") {
              var ticketStatusClass =
                "flex px-3 py-0.5 border rounded-full bg-purple-100 text-purple-700 border-purple-300 text-xs font-medium";
            } else if (ticket.status === "Accepted") {
              var ticketStatusClass =
                "flex px-3 py-0.5 border rounded-full bg-yellow-100 text-yellow-700 border-yellow-300 text-xs font-medium";
            } else if (ticket.status === "PendingApproval") {
              var ticketStatusClass =
                "flex px-3 py-0.5 border rounded-full bg-orange-100 text-orange-700 border-orange-300 text-xs font-medium";
            }

            return (
              <div
                key={index}
                className={elementClassname}
                onClick={() => navigate("/ticket/" + ticket.ticketNumber)}
              >
                <div className="flex overflow-hidden text-ellipsis items-start">
                  <p className="text-slate-400 font-medium whitespace-nowrap">#{ticket.ticketNumber}</p>
                  <p className="truncated-text-sm pl-3 pr-3 overflow-hidden font-semibold text-slate-800">
                    {ticket.title}
                  </p>
                  <div className="sm:flex hidden justify-end grow flex-shrink-0">
                    <p className={ticketStatusClass}>{ticket.status}</p>
                  </div>
                </div>

                <div className="flex mt-2 text-xs items-center">
                  <p className="text-indigo-500 whitespace-nowrap">
                    Start: <span className="text-slate-700 font-semibold">{ticketStartDate}</span>
                  </p>
                  {ticket.elevatedAccess ? (
                    <div className="hidden lg:flex ml-3 text-xs text-red-500 items-center">
                      <TbAlertTriangle className="text-sm mr-1" />
                      <p>Requires elevated access</p>
                    </div>
                  ) : null}
                  <div className="grow justify-end hidden sm:flex">
                    <p className="text-indigo-500">
                      {ticket.involvedTeams.map((team, index) => {
                        return (
                          <span
                            key={index}
                            className="text-slate-600 font-medium px-1.5 border-r-2 border-indigo-200 last:border-0"
                          >
                            {team}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center py-8 text-sm text-slate-400">
            <div>No active changes this week.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeDashboard;
