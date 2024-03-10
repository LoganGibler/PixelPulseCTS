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

          if (ticket.status === "Active") {
            var ticketStatusClass =
              "flex px-4 py-0.5 border-2 rounded-md bg-red-300 text-red-700 border-red-600 ";
          } else if (ticket.status === "Complete") {
            var ticketStatusClass =
              "flex px-4 py-0.5 border-2 rounded-md bg-green-300 text-green-700 border-green-600 ";
          } else if (ticket.status === "Submitted") {
            var ticketStatusClass =
              "flex px-4 py-0.5 border-2 rounded-md bg-purple-300 text-purple-700 border-purple-600 ";
          } else if (ticket.status === "Accepted") {
            var ticketStatusClass =
              "flex px-4 py-0.5 border-2 rounded-md bg-yellow-300 text-yellow-700 border-yellow-600 ";
          } else if (ticket.status === "PendingApproval") {
            var ticketStatusClass =
              "flex px-4 py-0.5 border-2 rounded-md bg-orange-300 text-orange-700 border-orange-600 ";
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
                <div className="justify-end grow flex font-semibold">
                  <p className="text-blue-700 whitespace-nowrap">
                    <span className="text-black"></span>
                  </p>
                  <p className="text-blue-700 mr-2 w-[170px] hidden sm:flex">
                    Start:{" "}
                    <span className="text-black ml-1">{formatedStartTime}</span>
                  </p>
                  <p className="text-blue-700 mr-2 w-[170px] hidden lg:flex">
                    End:{" "}
                    <span className="text-black pl-1">{formatedEndTime}</span>
                  </p>
                  <div className="w-[130px] justify-end hidden md:flex">
                    {" "}
                    <p className={ticketStatusClass}>{ticket.status}</p>
                  </div>
                </div>
              </div>

              <div className="flex mt-2 text-xs">
                <p className="text-blue-700 whitespace-nowrap py-1 text-ellipsis overflow-hidden">
                  <span className="font-semibold"> Involved Teams: </span>

                  {ticket.involvedTeams.map((team, index) => {
                    return (
                      <span
                        className="text-slate-100 bg-slate-700 py-[2px] px-2 mx-1 rounded-full border-r-[2px] font-semibold "
                        key={index}
                      >
                        {team}
                      </span>
                    );
                  })}
                </p>
                {/* <div className="flex justify-end grow"> */}
                <p className="text-blue-700 font-semibold text-xs mt-1 ml-8 hidden sm:flex">
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
