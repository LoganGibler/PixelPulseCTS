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
    // console.log(fetchedRequests);
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
    <div className="flex flex-col md:border-l-[10px] border-slate-700 grow md:w-[390px]">
      <div className="flex grow md:grow-0 py-2 text-white bg-slate-700 px-2">
        <AiOutlineTeam className="text-lg mt-0.5 mr-1.5" />
        <h1 className="font-semibold">Teams Service Requests</h1>
        <div className="flex grow justify-end">
          <BiSort
            className="text-lg mt-[4px] mr-[1px] hover:cursor-pointer"
            onClick={async (e) => {
              await handleSortClick(e, "time");
            }}
          />
          <BsSortUpAlt
            className="text-xl mx-3 mt-[3px] hover:cursor-pointer"
            onClick={async (e) => {
              await handleSortClick(e, "priority");
            }}
          />
          <GrUpdate
            className="text-base mx-1 mt-1 hover:cursor-pointer"
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
                "flex flex-col px-2 py-3 border-b-[1px] hover:cursor-pointer";
            } else {
              var elementClassname =
                "flex flex-col px-2 py-3 border-b-[1px] hover:cursor-pointer  bg-gray-200";
            }
            const ticketCompleteByDate = formatTimestamp(ticket.completeBy);
            const ticketCreationDate = formatTimestamp(ticket.dateCreated);

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
            } else if (ticket.status === "Waiting for 3rd Party") {
              var ticketStatusClass =
                "flex px-4 py-0.5 border-2 rounded-md bg-orange-300 text-orange-700 border-orange-600 whitespace-nowrap";
            }

            return (
              <div
                className={elementClassname}
                key={index}
                onClick={() => navigate("/ticket/" + ticket.ticketNumber)}
              >
                <div className="flex">
                  <p className="pr-2">#{ticket.ticketNumber}</p>
                  <p className="truncated-text-sm font-semibold pr-2">
                    {ticket.title}
                  </p>
                  <div className="flex justify-end grow">
                    <div>
                      <p className={ticketStatusClass}>{ticket.status}</p>
                    </div>
                  </div>
                </div>
                <div className="text-xs mt-[8px] px-2 flex py-1">
                  {ticket.userAssigned === "" ? (
                    <p className="text-blue-700 pr-5">
                      Submitter:{" "}
                      <span className="text-black font-semibold">
                        {ticket.submitter}
                      </span>
                    </p>
                  ) : (
                    <p className="text-blue-700 pr-5 overflow-hidden max-w-[155px] md:max-w-[300px] whitespace-nowrap text-ellipsis">
                      Assigned to:
                      <span className="text-black font-semibold ml-1">
                        {ticket.userAssigned}
                      </span>
                    </p>
                  )}

                  {ticket.userAssigned === "" ? (
                    <div className="flex grow justify-end">
                      <button
                        className="text-sm px-4 border-[1px] font-semibold rounded-lg bg-gradient text-white hover:cursor-pointer"
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
                        <p className="text-blue-700 whitespace-nowrap">
                          Created:{" "}
                          <span className="text-black font-semibold">
                            {ticketCreationDate}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <div className="flex grow justify-end">
                        {" "}
                        <div className="text-blue-700 whitespace-nowrap flex">
                          <p className="hidden md:flex whitespace-nowrap">
                            Complete By:
                          </p>

                          <p className="text-black font-semibold whitespace-nowrap">
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
          <div className="flex justify-center mt-4">
            <p>There are no service requests assigned to your team.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceReqDash;
