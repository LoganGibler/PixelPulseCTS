import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import { TbAlertTriangle } from "react-icons/tb";
import { getAllUnresolvedTickets } from "../api/tickets";
import {
  Bs1SquareFill,
  Bs2SquareFill,
  Bs3SquareFill,
  Bs4SquareFill,
} from "react-icons/bs";
import { useNavigate } from "react-router";

import { GrUpdate } from "react-icons/gr";
import { BiSort } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { BsSortUpAlt } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";

const AllIncidents = ({ userData }) => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [sort, setSort] = useState(false);
  const [prioritySort, setPrioritySort] = useState(false);
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

  const fetchAllIncidents = async () => {
    const allIncidents = await getAllUnresolvedTickets("Incident");
    setTickets(allIncidents);
  };

  const handleSortByPriority = async (prioritySort) => {
    setPrioritySort(!prioritySort);
    if (prioritySort) {
      const sortedTickets = [...tickets].sort(
        (a, b) => parseInt(a.priority) - parseInt(b.priority)
      );
      setTickets(sortedTickets);
    } else {
      const sortedTickets = [...tickets].sort(
        (a, b) => parseInt(a.priority) - parseInt(b.priority)
      );
      setTickets(sortedTickets.reverse());
    }
  };

  const handleReverseSort = async (sort) => {
    setSort(!sort);
    if (sort) {
      let sortedTickets = [...tickets].sort(
        (a, b) => parseInt(a.ticketNumber) - parseInt(b.ticketNumber)
      );
      // console.log(sortedTickets);
      setTickets(sortedTickets);
    } else {
      fetchAllIncidents();
    }
  };

  useEffect(() => {
    fetchAllIncidents();
  }, [userData]);

  return (
    <div className="text-white text-sm md:text-base">
      <div className="bg-slate-700 px-2 py-1 md:py-1.5 flex md:pl-1 md:pr-3">
        <TbAlertTriangle className="text-xl mt-1 mr-2 ml-3 flex" />
        <p className="font-bold mt-1 whitespace-nowrap pr-4 pb-0.5 md:mt-0.5">
          All Incidents
        </p>
        <div className="flex justify-end mt-[3px] grow md:mr-3">
          <Searchbar />
          <BiSort
            className="text-[21px] mt-[1px] ml-4 mr-1 hover:cursor-pointer hidden md:flex"
            onClick={() => {
              handleReverseSort(sort);
            }}
          />
          <BsSortUpAlt
            className="text-[24px] mt-[0px] mx-2 hover:cursor-pointer hidden md:flex"
            onClick={() => handleSortByPriority(prioritySort)}
          />
          <GrUpdate
            className="text-[17px] mt-[3px] mx-1 hover:cursor-pointer hidden md:flex"
            onClick={() => fetchAllIncidents()}
          />
        </div>
      </div>

      <div className="text-black">
        {tickets.length ? (
          tickets.map((ticket, index) => {
            const ticketCreationDate = formatTimestamp(ticket.dateCreated);

            if (index % 2 === 0) {
              var ticketClassname =
                "flex grow border-b-[1px] py-3.5 px-3 hover:cursor-pointer bg-white text-sm";
            } else {
              var ticketClassname =
                "flex grow border-b-[1px] py-3.5 px-3 hover:cursor-pointer bg-gray-200 text-sm";
            }

            if (ticket.status === "Active") {
              var ticketStatusClass =
                " px-4 py-0.5 border-2 rounded-md bg-red-300 text-red-700 border-red-600";
            } else if (ticket.status === "Resolved") {
              var ticketStatusClass =
                " px-4 py-0.5 border-2 rounded-md bg-green-300 text-green-700 border-green-600";
            } else if (ticket.status === "Submitted") {
              var ticketStatusClass =
                "h px-4 py-0.5 border-2 rounded-md bg-purple-300 text-purple-700 border-purple-600";
            } else if (ticket.status === "Waiting for 3rd Party") {
              var ticketStatusClass =
                " px-4 py-0.5 border-2 rounded-md bg-yellow-300 text-yellow-700 border-yellow-600";
            }

            return (
              <div
                key={index}
                className={ticketClassname}
                onClick={() => navigate("/ticket/" + ticket.ticketNumber)}
              >
                <p className="mr-2 mt-[4px]">#{ticket.ticketNumber}</p>
                {ticket.priority === "1" ? (
                  <Bs1SquareFill className=" min-w-[20px] min-h-[18px] mt-[4px]  mr-2 text-lg text-red-700" />
                ) : null}
                {ticket.priority === "2" ? (
                  <Bs2SquareFill className=" min-w-[20px] min-h-[18px] mt-[4px]  mr-2 text-lg text-blue-800" />
                ) : null}
                {ticket.priority === "3" ? (
                  <Bs3SquareFill className=" min-w-[20px] min-h-[18px] mt-[4px]  mr-2 text-lg text-yellow-500" />
                ) : null}
                {ticket.priority === "4" ? (
                  <Bs4SquareFill className=" min-w-[20px] min-h-[18px] mt-[4px]  mr-2 text-lg text-green-600" />
                ) : null}
                <p className="overflow-hidden mt-[4px] text-ellipsis whitespace-nowrap md:pr-6 font-semibold">
                  {ticket.title}
                </p>

                <div className="flex justify-end grow text-sm">
                  <div className="text-blue-700 whitespace-nowrap pr-0 hidden sm:flex min-w-[145px] overflow-hidden text-ellipsis ml-3">
                    <AiOutlineTeam className="text-lg mt-[5px] mr-1" />
                    <p className="text-slate-100 bg-slate-700 rounded-full px-3 pb-[2px] mt-[5px] mb-[2px]">
                      {" "}
                      {ticket.team}
                    </p>
                  </div>
                  <p className="hidden md:flex text-blue-700 pl-8 whitespace-nowrap pr-4 min-w-[140px] overflow-hidden text-ellipsis">
                    <FaRegClock className="mr-1 mt-[7px]" />
                    <span className="text-black mt-[4px]">
                      {ticketCreationDate}
                    </span>
                  </p>

                  <div className="w-[168px] justify-start hidden lg:flex ml-6">
                    <p className={ticketStatusClass}>{ticket.status}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center mt-5">
            <p className="">
              {" "}
              There are no active Incidents. If you know there are supposed to
              be active Incidents, Please contact your admin to troubleshoot the
              issue.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllIncidents;
