import React, { useState } from "react";
import UploadFile from "./UploadFile";
import TicketAttachments from "./TicketAttachments";
import TicketHeader from "./TicketHeader";
import TicketComments from "./TicketComments";
import SelectFooterType from "./SelectFooterType";
import AuditLog from "./AuditLog";
import { MdRemoveCircle } from "react-icons/md";
import moment from "moment-timezone";

const ServiceRequestView = ({
  userData,
  companyTeams,
  ticketValues,
  setTicketValues,
  activeTicketFooter,
  setActiveTicketFooter,
  handleAddTeamClick,
  handleAddTeam,
  handleRemoveTeam,
  formatTimestamp,
  fetchTicketInfo,
}) => {
  const [createCommentActive, setCreateCommentActive] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

//   console.log(ticketValues);

  if (ticketValues.status === "Active") {
    var ticketStatusClass =
      "bg-red-300 border-2 text-red-500 border-red-500  rounded-md px-1 text-center py-[1px] font-bold hover:cursor-pointer";
  } else if (ticketValues.status === "Completed") {
    var ticketStatusClass =
      "bg-green-100 border-2 text-green-600 border-green-500  rounded-md px-1 text-center py-[1px] font-bold hover:cursor-pointer";
  } else if (ticketValues.status === "Waiting for 3rd Party") {
    var ticketStatusClass =
      "bg-yellow-100 border-2 text-yellow-500 border-yellow-500  rounded-md px-1 text-center py-[1px] font-bold hover:cursor-pointer";
  } else if (ticketValues.status === "Submitted") {
    var ticketStatusClass =
      "bg-purple-300 border-2 text-purple-500 border-purple-600  rounded-md px-1 text-center py-[1px] font-bold hover:cursor-pointer";
  } else if (ticketValues.status === "Closed") {
    var ticketStatusClass =
      "bg-stone-700 border-2 text-stone-100 border-stone-600  rounded-md px-1 text-center py-[1px] font-bold hover:cursor-pointer";
  }

  let completeByDate = new Date(ticketValues.completeBy);
  completeByDate = moment
    .tz(completeByDate, "America/New_York")
    .format("YYYY-MM-DDTHH:mm");

  return (
    <div className="bg-slate-50 grow flex flex-col py-2 sm:mx-2 mx-0 ">
      <TicketHeader
        userData={userData}
        ticketValues={ticketValues}
        setTicketValues={setTicketValues}
        companyTeams={companyTeams}
        handleRemoveTeam={handleRemoveTeam}
        handleAddTeamClick={handleAddTeamClick}
        fetchTicketInfo={fetchTicketInfo}
      />
      <div className="flex justify-center">
        <div className="flex flex-col grow min-h-screen max-w-[1100px] md:px-[4rem] px-[0.5rem]">
          <div className="flex flex-col text-lg">
            <div className="flex grow mt-6 text-base sm:text-base">
              <p className="pr-2 whitespace-nowrap mt-[2px] font-bold hidden sm:flex">
                {ticketValues.type}
              </p>
              <p className=" font-bold mt-[1.5px] mr-2">
                #{ticketValues.ticketNumber}
              </p>

              <input
                className="flex grow bg-slate-200 px-3 overflow-hidden border-2 border-slate-300 rounded-md text-ellipsis w-100%"
                value={ticketValues.title}
                onChange={(e) =>
                  setTicketValues({ ...ticketValues, title: e.target.value })
                }
              ></input>
            </div>

            <div className="flex flex-col sm:flex-row text-sm mt-8">
              <div>
                <select
                  className={ticketStatusClass}
                  value={ticketValues.status}
                  onChange={(e) =>
                    setTicketValues({ ...ticketValues, status: e.target.value })
                  }
                >
                  <option value="Submitted" className="bg-slate-100 text-black">
                    Submitted
                  </option>

                  <option value="Active" className="bg-slate-100 text-black">
                    Active
                  </option>
                  <option value="Completed" className="bg-slate-100 text-black">
                    Completed
                  </option>
                  <option value="Closed" className="bg-slate-100 text-black">
                    Closed
                  </option>
                  <option
                    value="Waiting for 3rd Party"
                    className="bg-slate-100 text-black"
                  >
                    Waiting for 3rd Party
                  </option>
                </select>
              </div>

              <div className="flex grow mt-5 px-2 sm:mt-0">
                <div className="flex sm:ml-4 text-base">
                  <p className="border-b-2 border-blue-700">Priority: </p>
                  <div className="ml-1 border-b-2 border-blue-700 pb-1">
                    <select
                      className="px-1 bg-slate-50"
                      value={ticketValues.priority}
                      onChange={(e) =>
                        setTicketValues({
                          ...ticketValues,
                          priority: e.target.value,
                        })
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end grow">
                  <select
                    className="border-b-2 border-blue-700 bg-slate-50 pb-1"
                    value={ticketValues.team}
                    onChange={(e) =>
                      setTicketValues({ ...ticketValues, team: e.target.value })
                    }
                  >
                    {companyTeams.length
                      ? companyTeams.map((team, index) => {
                          return (
                            <option value={team} key={index}>
                              {team}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row mt-10 text-sm lg:hidden">
              <div className="mt-[3px] flex">
                <div>
                  <p className="mt-0.5 mr-1 border-b-2 border-blue-700 pb-2 whitespace-nowrap">
                    Add Teams for Visibility:{" "}
                  </p>
                </div>

                <div>
                  <select
                    className="w-[100px] bg-slate-200 px-1 py-[2px] rounded-md"
                    onChange={(e) => handleAddTeamClick(e, e.target.value)}
                    value={companyTeams[0]}
                  >
                    {companyTeams.length
                      ? companyTeams.map((team, index) => {
                          if (ticketValues.involvedTeams.includes(team)) {
                            return;
                          }
                          return (
                            <option value={team} key={index}>
                              {team}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap mt-3 sm:mt-0">
                {ticketValues.involvedTeams.length
                  ? ticketValues.involvedTeams.map((team, index) => {
                      return (
                        <div key={index}>
                          {" "}
                          <p className="text-sm mt-[1px] py-[3px] flex mx-[0px] border-[1px] bg-slate-700 text-white px-2 rounded-lg">
                            {team}
                            <MdRemoveCircle
                              className="ml-1 mt-1 hover:cursor-pointer"
                              onClick={(e) => handleRemoveTeam(e, team)}
                            />
                          </p>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>

            <div className="flex text-sm mt-9">
              <p className="mr-2 border-b-2 border-blue-700">Complete By: </p>
              <input
                className="bg-slate-200 border-2 px-2 rounded-md"
                type="datetime-local"
                value={ticketValues.completeBy ? completeByDate : ""}
                onChange={(e) =>
                  setTicketValues({
                    ...ticketValues,
                    completeBy: e.target.value,
                  })
                }
              ></input>
            </div>

            <div className="flex mt-12">
              <textarea
                className="bg-slate-200 text-sm rounded-md py-1 px-2 grow min-h-[250px] border-2 border-slate-300"
                value={ticketValues.description}
                onChange={(e) =>
                  setTicketValues({
                    ...ticketValues,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>

            <div className="flex flex-wrap mt-6 text-sm">
              <div className="flex mr-4 my-3">
                <p className="flex mr-2 text-blue-700">Emergency: </p>
                <input
                  type="checkbox"
                  className="hover:cursor-pointer"
                  checked={ticketValues.emergency}
                  onChange={(e) =>
                    setTicketValues({
                      ...ticketValues,
                      emergency: !ticketValues.emergency,
                    })
                  }
                ></input>
              </div>
              <div className="flex justify-end grow">
                <p className="text-blue-700 mt-[12px] ml-0 whitespace-nowrap">
                  Submitter:{" "}
                  <span className="text-black"> {ticketValues.submitter}</span>
                </p>
              </div>
            </div>

            <TicketAttachments
              ticketNumber={ticketValues.ticketNumber}
              uploadComplete={uploadComplete}
              setUploadComplete={setUploadComplete}
            />
            <UploadFile
              ticketNumber={ticketValues.ticketNumber}
              fetchTicketInfo={fetchTicketInfo}
              setUploadComplete={setUploadComplete}
              uploadComplete={uploadComplete}
            />
            <div className="flex pb-3 border-b-2 mb-2 border-blue-700">
              <SelectFooterType
                activeTicketFooter={activeTicketFooter}
                setActiveTicketFooter={setActiveTicketFooter}
                setCreateCommentActive={setCreateCommentActive}
                type={ticketValues.type}
                fetchTicketInfo={fetchTicketInfo}
              />
            </div>
            <div className="flex justify-center">
              {activeTicketFooter === "Comments" ? (
                <TicketComments
                  ticketNumber={ticketValues.ticketNumber}
                  formatTimestamp={formatTimestamp}
                  userData={userData}
                  createCommentActive={createCommentActive}
                  setCreateCommentActive={setCreateCommentActive}
                />
              ) : null}
              {activeTicketFooter === "AuditLog" ? (
                <AuditLog auditLog={ticketValues.auditString} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestView;
