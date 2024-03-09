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
            {
              /* console.log(ticket); */
            }

            if (index % 2 === 0) {
              var ticketClassname =
                "flex grow border-b-[1px] py-3.5 px-3 hover:cursor-pointer bg-white text-sm";
            } else {
              var ticketClassname =
                "flex grow border-b-[1px] py-3.5 px-3 hover:cursor-pointer bg-gray-200 text-sm";
            }

            return (
              <div
                key={index}
                className={ticketClassname}
                onClick={() => navigate("/ticket/" + ticket.ticketNumber)}
              >
                <p className="mr-2">#{ticket.ticketNumber}</p>
                {ticket.priority === "1" ? (
                  <Bs1SquareFill className=" min-w-[20px] min-h-[18px] mt-[1px]  mr-2 text-lg text-red-700" />
                ) : null}
                {ticket.priority === "2" ? (
                  <Bs2SquareFill className=" min-w-[20px] min-h-[18px] mt-[1px]  mr-2 text-lg text-blue-800" />
                ) : null}
                {ticket.priority === "3" ? (
                  <Bs3SquareFill className=" min-w-[20px] min-h-[18px] mt-[1px]  mr-2 text-lg text-yellow-500" />
                ) : null}
                {ticket.priority === "4" ? (
                  <Bs4SquareFill className=" min-w-[20px] min-h-[18px] mt-[1px]  mr-2 text-lg text-green-600" />
                ) : null}
                <p className="overflow-hidden text-ellipsis whitespace-nowrap md:pr-6 font-semibold">
                  {ticket.title}
                </p>

                <div className="flex justify-end grow text-sm">
                  <p className="hidden md:flex text-blue-700 pl-8 whitespace-nowrap pr-4 min-w-[160px] overflow-hidden text-ellipsis">
                    <FaRegClock className="mt-[3px] mr-1" />
                    <span className="text-black">{ticketCreationDate}</span>
                  </p>
                  <p className="text-blue-700 whitespace-nowrap pr-0 hidden sm:flex min-w-[160px] overflow-hidden text-ellipsis ml-3">
                    <AiOutlineTeam className="text-lg mt-[1px] mr-1" />
                    <span className="text-black">{ticket.team}</span>
                  </p>
                  <p className="hidden lg:flex text-blue-700 min-w-[180px] overflow-hidden text-ellipsis">
                    Status:
                    <span className="text-black pl-1">{ticket.status}</span>
                  </p>
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
