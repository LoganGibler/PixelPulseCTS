import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import { getAllUnresolvedTickets } from "../api/tickets";
import moment from "moment";
import { GrUpdate } from "react-icons/gr";
import { BiSort } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { useNavigate } from "react-router";

const AllServiceRequests = ({ userData }) => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [sort, setSort] = useState(false);

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

  const handleReverseSort = async () => {
    setSort(!sort);
    if (sort) {
      const sortedTickets = [...tickets].sort(
        (a, b) => moment(a.completeBy).toDate() - moment(b.completeBy).toDate()
      );
      setTickets(sortedTickets);
    } else {
      setTickets(tickets.reverse());
    }
  };

  const fetchAllServiceRequests = async () => {
    const response = await getAllUnresolvedTickets("Service Request");
    const sortedTickets = [...response].sort(
      (a, b) => moment(a.completeBy).toDate() - moment(b.completeBy).toDate()
    );
    setTickets(sortedTickets);
  };

  useEffect(() => {
    fetchAllServiceRequests();
  }, []);

  return (
    <div className="text-sm">
      <div className="flex bg-slate-700 px-1 md:px-4 text-white py-1.5 text-base">
        <p className="flex font-semibold whitespace-nowrap ml-2 mt-[2px] sm:mt-[2px] pr-1 text-sm sm:text-base">
          <BiTask className="text-lg mt-[1px] md:mt-[3px] mr-2 flex" />
          All Service Requests
        </p>
        <div className="flex justify-end grow mt-[1px]">
          <Searchbar />
        </div>
        <BiSort
          className="text-[22px] mt-[3px] mx-2 hidden sm:flex hover:cursor-pointer"
          onClick={() => handleReverseSort()}
        />
        <GrUpdate
          className="text-[17px] mt-[5px] mr-2 hidden sm:flex hover:cursor-pointer"
          onClick={() => fetchAllServiceRequests()}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket, index) => {
          const formattedTimeStamp = formatTimestamp(ticket.completeBy);

          if (index % 2 === 0) {
            var ticketClassname = "px-3 flex py-3  hover:cursor-pointer";
          } else {
            var ticketClassname =
              "px-3 flex py-3 bg-gray-200 hover:cursor-pointer";
          }

          if (ticket.status === "Active") {
            var ticketStatusClass =
              "flex px-4 py-0.5 border-2 rounded-md bg-red-300 text-red-700 border-red-600 whitespace-nowrap";
          } else if (ticket.status === "Completed") {
            var ticketStatusClass =
              "flex px-4 py-0.5 border-2 rounded-md bg-green-300 text-green-700 border-green-600 whitespace-nowrap";
          } else if (ticket.status === "Submitted") {
            var ticketStatusClass =
              "flex px-4 py-0.5 border-2 rounded-md bg-purple-300 text-purple-700 border-purple-600 whitespace-nowrap";
          } else if (ticket.status === "Accepted") {
            var ticketStatusClass =
              "flex px-4 py-0.5 border-2 rounded-md bg-yellow-300 text-yellow-700 border-yellow-600 whitespace-nowrap";
          } else if (ticket.status === "PendingApproval") {
            var ticketStatusClass =
              "flex px-4 py-0.5 border-2 rounded-md bg-orange-300 text-orange-700 border-orange-600 whitespace-nowrap";
          } else if (ticket.status === "Waiting for 3rd Party") {
            var ticketStatusClass =
              "flex px-4 py-0.5 border-2 rounded-md bg-orange-300 text-orange-700 border-orange-600 whitespace-nowrap";
          }

          return (
            <div
              key={index}
              className={ticketClassname}
              onClick={() => navigate("/ticket/" + ticket.ticketNumber)}
            >
              <p className="pr-4 mt-[6px]">#{ticket.ticketNumber}</p>
              <p className="whitespace-nowrap mt-[6px] overflow-hidden text-ellipsis pr-3 font-semibold">
                {ticket.title}
              </p>

              <div className="flex grow justify-end">
                <p className="text-blue-700 min-w-[220px] mt-[6px] whitespace-nowrap hidden md:flex">
                  Complete By:
                  {ticket.completeBy === "" || !ticket.completeBy ? (
                    <span className="text-black pl-1">EOD</span>
                  ) : (
                    <span className="text-black pl-1">
                      {formattedTimeStamp}
                    </span>
                  )}
                </p>
                <p className="flex text-blue-700 min-w-[100px] md:min-w-[160px] whitespace-nowrap overflow-hidden text-ellipsis ml-4">
                  <AiOutlineTeam className="mr-1 mt-[6px] text-lg" />
                  <span className="rounded-full px-2 mt-[5px] py-[1px] mb-[3px] bg-slate-700 text-slate-100">
                    {ticket.team}
                  </span>
                </p>

                <div className="flex justify-start w-[160px] ml-4">
                  <p className={ticketStatusClass}>{ticket.status}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center text-sm mt-3">
          <p>
            There are no active service requests. If there should be, please
            contact your admin for troubleshooting.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllServiceRequests;
