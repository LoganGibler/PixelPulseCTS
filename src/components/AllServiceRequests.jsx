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
          return (
            <div
              key={index}
              className={ticketClassname}
              onClick={() => navigate("/ticket/" + ticket.ticketNumber)}
            >
              <p className="pr-4">#{ticket.ticketNumber}</p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis pr-3 font-semibold">
                {ticket.title}
              </p>

              <div className="flex grow justify-end">
                <p className="text-blue-700 md:min-w-[160px] hidden lg:flex">
                  Status:
                  <span className="text-black pl-1">{ticket.status}</span>
                </p>
                <p className="flex text-blue-700 min-w-[100px] md:min-w-[160px] whitespace-nowrap overflow-hidden text-ellipsis">
                  <AiOutlineTeam className="mr-1 text-lg" />
                  <span className="text-black">{ticket.team}</span>
                </p>
                <p className="text-blue-700 min-w-[220px] whitespace-nowrap hidden md:flex">
                  Complete By:
                  {ticket.completeBy === "" || !ticket.completeBy ? (
                    <span className="text-black pl-1">EOD</span>
                  ) : (
                    <span className="text-black pl-1">
                      {formattedTimeStamp}
                    </span>
                  )}
                </p>
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
