import React, { useEffect, useState } from "react";
import { getTeamsTickets, claimTicket } from "../api/tickets";
import { GrUpdate } from "react-icons/gr";
import { BiSort } from "react-icons/bi";
import { AiOutlineTeam } from "react-icons/ai";
import { BsSortUpAlt, BsTicketDetailed } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import moment from "moment";
import { useNavigate } from "react-router";

const ServiceReqDash = ({ userData }) => {
  const navigate = useNavigate();
  const [serviceRequests, setServiceRequests] = useState([]);
  const [sort, setSort] = useState(false);
  const [priority, setPriority] = useState(false);

  async function fetchServiceRequests(userData) {
    const fetchedRequests = await getTeamsTickets("Service Request", userData);
    setServiceRequests(fetchedRequests);
  }

  useEffect(() => {
    fetchServiceRequests(userData);
  }, [userData]);

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
      const sortedServiceRequests = [...serviceRequests].sort(
        (a, b) => parseInt(a.priority, 10) - parseInt(b.priority, 10)
      );
      priority ? sortedServiceRequests.reverse() : null;
      setServiceRequests(sortedServiceRequests);
    }

    if (sortType === "time") {
      setSort(!sort);
      const sortedServiceRequests = [...serviceRequests].sort(
        (a, b) => moment(a.completeBy).toDate() - moment(b.completeBy).toDate()
      );

      sort ? sortedServiceRequests.reverse() : null;
      setServiceRequests(sortedServiceRequests);
    }
  }

  return (
    <div className="flex flex-col grow rounded-xl overflow-hidden shadow-md border border-slate-200 bg-white">
      <div className="flex grow-0 py-3 panel-header px-3 border-b border-white/20">
        <AiOutlineTeam className="text-lg text-white mt-0.5 mr-2" />
        <h1 className="font-semibold text-white text-sm tracking-wide">Teams Service Requests</h1>
        <div className="flex grow justify-end items-center gap-3">
          <BiSort
            className="text-lg text-white hover:cursor-pointer hover:text-white/70 transition-colors"
            onClick={async (e) => {
              await handleSortClick(e, "time");
            }}
          />
          <BsSortUpAlt
            className="text-xl text-white hover:cursor-pointer hover:text-white/70 transition-colors"
            onClick={async (e) => {
              await handleSortClick(e, "priority");
            }}
          />
          <GrUpdate
            className="text-sm text-white hover:cursor-pointer hover:text-white/70 transition-colors"
            onClick={async (e) => {
              await fetchServiceRequests(userData);
            }}
          />
        </div>
      </div>

      <div className="text-sm overflow-y-scroll max-h-[650px]">
        {serviceRequests ? (
          serviceRequests.map((ticket, index) => {
            if (index % 2 === 0) {
              var elementClassname =
                "flex flex-col px-3 py-3 border-b border-slate-100 hover:cursor-pointer hover:bg-indigo-50 transition-colors duration-150";
            } else {
              var elementClassname =
                "flex flex-col px-3 py-3 border-b border-slate-100 hover:cursor-pointer bg-slate-50 hover:bg-indigo-50 transition-colors duration-150";
            }
            const ticketCompleteByDate = formatTimestamp(ticket.completeBy);
            const ticketCreationDate = formatTimestamp(ticket.dateCreated);

            if (ticket.status === "Active") {
              var ticketStatusClass =
                "flex px-3 py-0.5 border rounded-full bg-red-100 text-red-700 border-red-300 whitespace-nowrap text-xs font-medium";
            } else if (ticket.status === "Completed") {
              var ticketStatusClass =
                "flex px-3 py-0.5 border rounded-full bg-green-100 text-green-700 border-green-300 whitespace-nowrap text-xs font-medium";
            } else if (ticket.status === "Submitted") {
              var ticketStatusClass =
                "flex px-3 py-0.5 border rounded-full bg-purple-100 text-purple-700 border-purple-300 whitespace-nowrap text-xs font-medium";
            } else if (ticket.status === "Accepted") {
              var ticketStatusClass =
                "flex px-3 py-0.5 border rounded-full bg-yellow-100 text-yellow-700 border-yellow-300 whitespace-nowrap text-xs font-medium";
            } else if (ticket.status === "Waiting for 3rd Party") {
              var ticketStatusClass =
                "flex px-3 py-0.5 border rounded-full bg-orange-100 text-orange-700 border-orange-300 whitespace-nowrap text-xs font-medium";
            }

            return (
              <div
                className={elementClassname}
                key={index}
                onClick={() => navigate("/ticket/" + ticket.ticketNumber)}
              >
                <div className="flex items-start">
                  <p className="pr-2 text-slate-400 font-medium whitespace-nowrap">#{ticket.ticketNumber}</p>
                  <p className="truncated-text-sm font-semibold pr-2 text-slate-800">
                    {ticket.title}
                  </p>
                  <div className="flex justify-end grow flex-shrink-0">
                    <div>
                      <p className={ticketStatusClass}>{ticket.status}</p>
                    </div>
                  </div>
                </div>
                <div className="text-xs mt-2 px-1 flex py-1 items-center">
                  {ticket.userAssigned === "" ? (
                    <p className="text-indigo-500 pr-5">
                      Submitter:{" "}
                      <span className="text-slate-700 font-semibold">
                        {ticket.submitter}
                      </span>
                    </p>
                  ) : (
                    <p className="text-indigo-500 pr-5 overflow-hidden max-w-[155px] md:max-w-[300px] whitespace-nowrap text-ellipsis">
                      Assigned to:
                      <span className="text-slate-700 font-semibold ml-1">
                        {ticket.userAssigned}
                      </span>
                    </p>
                  )}

                  {ticket.userAssigned === "" ? (
                    <div className="flex grow justify-end">
                      <button
                        className="px-4 py-1 font-semibold rounded-full bg-gradient text-white text-xs hover:cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
                        onClick={async (e) => {
                          e.stopPropagation();
                          await claimTicket(ticket._id, userData);
                          await fetchServiceRequests(userData);
                        }}
                      >
                        Claim
                      </button>
                    </div>
                  ) : null}

                  {ticket.userAssigned ? (
                    !ticket.completeBy ? (
                      <div className="flex grow justify-end">
                        <p className="text-indigo-500 whitespace-nowrap">
                          Created:{" "}
                          <span className="text-slate-700 font-semibold">
                            {ticketCreationDate}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <div className="flex grow justify-end">
                        <div className="text-indigo-500 whitespace-nowrap flex">
                          <p className="hidden md:flex whitespace-nowrap">
                            Complete By:&nbsp;
                          </p>
                          <p className="text-slate-700 font-semibold whitespace-nowrap">
                            {ticketCompleteByDate}
                          </p>
                        </div>
                      </div>
                    )
                  ) : null}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center mt-8 text-slate-400 text-sm">
            <p>No service requests assigned to your team.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceReqDash;
