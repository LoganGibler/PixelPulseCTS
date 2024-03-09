import React, { useState, useEffect } from "react";
import { getAllUnresolvedTickets } from "../api/tickets";
import { FaCalendarAlt } from "react-icons/fa";
import Searchbar from "./Searchbar";
import moment from "moment";
import { GrUpdate } from "react-icons/gr";
import { BiSort } from "react-icons/bi";
import { useNavigate } from "react-router";

const AllChanges = ({ userData }) => {
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

  const fetchAllChanges = async () => {
    const fetchedTickets = await getAllUnresolvedTickets("Change");

    const sortedTickets = [...fetchedTickets].sort(
      (a, b) =>
        moment(a.implementationStart).toDate() -
        moment(b.implementationStart).toDate()
    );
    // console.log(fetchedTickets);
    setTickets(sortedTickets);
  };

  const handleSortByDate = async () => {
    setSort(!sort);
    if (sort) {
      const sortedTickets = [...tickets].sort(
        (a, b) =>
          moment(a.implementationStart).toDate() -
          moment(b.implementationStart).toDate()
      );
      setTickets(sortedTickets);
    } else {
      setTickets(tickets.reverse());
    }
  };

  useEffect(() => {
    fetchAllChanges();
  }, []);

  return (
    <div className="text-sm">
      <div className="flex bg-slate-700 px-2 py-1.5 text-white lg:px-4">
        <FaCalendarAlt className="mr-1.5 text-lg mt-0.5" />
        <p className="text-base font-semibold">All Changes</p>
        <div className="flex justify-end grow mt-0.5">
          <Searchbar />
        </div>
        <BiSort
          className="hidden sm:flex text-[22px] mt-0.5 mr-2 ml-3 hover:cursor-pointer"
          onClick={handleSortByDate}
        />
        <GrUpdate
          className="hidden sm:flex mr-1 text-lg mt-[4px] hover:cursor-pointer"
          onClick={() => fetchAllChanges()}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket, index) => {
          const formatedStartTime = formatTimestamp(ticket.implementationStart);
          const formatedEndTime = formatTimestamp(ticket.implementationEnd);
          if (index % 2 === 0) {
            var ticketContainerClass =
              "flex flex-col px-3 py-3.5 hover:cursor-pointer";
          } else {
            var ticketContainerClass =
              "bg-gray-200 flex flex-col px-3 py-3.5 hover:cursor-pointer";
          }

          return (
            <div
              className={ticketContainerClass}
              key={index}
              onClick={() => navigate("/ticket/" + ticket.ticketNumber)}
            >
              <div className="flex">
                <p className="mr-2">#{ticket.ticketNumber}</p>
                <p className="overflow-hidden text-ellipsis pr-3 whitespace-nowrap font-semibold">
                  {ticket.title}
                </p>
                <div className="justify-end grow hidden sm:flex">
                  <p className="text-blue-700 whitespace-nowrap">
                    <span className="text-black"></span>
                  </p>
                  <p className="text-blue-700 mr-2 w-[170px]">
                    Start:{" "}
                    <span className="text-black">{formatedStartTime}</span>
                  </p>
                  <p className="text-blue-700 mr-2 w-[170px] hidden md:flex">
                    End:{" "}
                    <span className="text-black pl-1">{formatedEndTime}</span>
                  </p>
                  <p className="text-blue-700 flex whitespace-nowrap">
                    Status:{" "}
                    <span className="text-black pl-1 whitespace-nowrap w-[120px]">
                      {ticket.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex mt-2 text-xs">
                <p className="text-blue-700 whitespace-nowrap text-ellipsis overflow-hidden">
                  Involved Teams:{" "}
                  {ticket.involvedTeams.map((team, index) => {
                    return (
                      <span
                        className="text-black px-2 border-r-[2px] font-semibold border-green-500"
                        key={index}
                      >
                        {team}
                      </span>
                    );
                  })}
                </p>
                {/* <div className="flex justify-end grow"> */}
                <p className="text-blue-700 text-xs ml-4 hidden sm:flex">
                  Submitter:
                  <span className="text-black pl-1">
                    {ticket.submitter}
                  </span>{" "}
                </p>
                {/* </div> */}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center mt-3">
          <p>
            No change Tickets found. If there are supposed to be change tickets
            available, please contact your administrator.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllChanges;
