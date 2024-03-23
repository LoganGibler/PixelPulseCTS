import React, { useState } from "react";
import { MdRemoveCircle } from "react-icons/md";
import { createTicket } from "../api/tickets";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const TicketCreation = ({
  userData,
  companyTeams,
  createTicketActive,
  setCreateTicketActive,
}) => {
  const navigate = useNavigate();
  const [type, setType] = useState("Event");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let [involvedTeams, setInvolvedTeams] = useState([]);
  const [assignedTeam, setAssignedTeam] = useState("DatacenterOps");
  const [priority, setPriority] = useState("4");
  const [isPaging, setIsPaging] = useState(false);
  const [isMaster, setIsMaster] = useState(false);
  const [completeBy, setCompleteBy] = useState(null);
  const [implementationStart, setImplementationStart] = useState("");
  const [implementationEnd, setImplementationEnd] = useState("");
  const [relatedTicket, setRelatedTicket] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [elevatedAccess, setElevatedAccess] = useState("");
  const [accessRequired, setAccessRequired] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  let addedTeams = [];

  const convertToDateCompleteBy = async (date) => {
    try {
      const dateValue = new Date(date);
      console.log(dateValue);
      setCompleteBy(dateValue);
    } catch (error) {
      throw error;
    }
  };

  const convertToDateImpStart = async (date) => {
    const dateValue = new Date(date);
    setImplementationStart(dateValue);
  };

  const convertToDateImpEnd = async (date) => {
    const dateValue = new Date(date);
    setImplementationEnd(dateValue);
  };

  const handleSelectOfAccess = async () => {
    try {
      let selectedGroup = document.getElementById("accessDescription");
      let output = selectedGroup.options[selectedGroup.selectedIndex].value;
      console.log(output);
      setElevatedAccess(output);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTypeSelect = async () => {
    try {
      let selectedType = document.getElementById("type");
      let output = selectedType.options[selectedType.selectedIndex].value;
      setType(output);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrioritySelect = async () => {
    try {
      let selectedPriority = document.getElementById("priority");
      let output =
        selectedPriority.options[selectedPriority.selectedIndex].value;
      setPriority(output);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTeam = async () => {
    try {
      const selectedValue = document.getElementById("team");
      let output = selectedValue.options[selectedValue.selectedIndex].value;
      return output;
    } catch (error) {
      console.error(error);
    }
  };

  const handleTeamAssignment = async () => {
    try {
      const selectedValue = document.getElementById("assignedTeam");
      let output = selectedValue.options[selectedValue.selectedIndex].value;
      setAssignedTeam(output);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTeamClick = async (e, addedTeam) => {
    try {
      let teamArray = [...involvedTeams, addedTeam];
      setInvolvedTeams(teamArray);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveTeam = async (e, team) => {
    try {
      const updatedArray = involvedTeams.filter(
        (removedTeam) => removedTeam !== team
      );
      setInvolvedTeams(updatedArray);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const uploadFile = async (file, ticketNumber) => {
    console.log("HERE IS PARAMS", file, ticketNumber);
    const storageRef = ref(
      storage,
      `TicketAttachments/${ticketNumber}/${file.name}`
    );
    await uploadBytes(storageRef, file);
  };

  return (
    <div className="absolute top-12 md:top-20 z-10 flex grow min-w-[350px] sm:min-w-[625px] md:min-w-[750px]">
      <form
        className="flex flex-col grow box-shadow px-4 py-5 bg-slate-100 rounded-md"
        onSubmit={async (e) => {
          e.preventDefault();
          // console.log("creat");
          try {
            const newTicket = await createTicket(
              type,
              title,
              description,
              involvedTeams,
              assignedTeam,
              priority,
              isPaging,
              isMaster,
              userData,
              completeBy,
              implementationStart,
              implementationEnd,
              elevatedAccess,
              relatedTicket,
              emergency
            );

            console.log(
              "!!!!!!!!!!!!!!!",
              newTicket.data.createdTicket.ticketNumber
            );

            if (newTicket) {
              setCreateTicketActive(false);
              if (selectedFile) {
                await uploadFile(
                  selectedFile,
                  newTicket.data.createdTicket.ticketNumber
                );
              }

              // upload attachment here, we will need the new ticket number
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <div
          className="flex border-b-[2px] pb-2 border-blue-200 grow"
          onChange={handleTypeSelect}
        >
          <p className="font-semibold mt-0.5">Ticket Type: </p>
          <div className="flex grow justify-end">
            <select id="type" defaultValue="" className="hover:cursor-pointer">
              <option className="" value=""></option>

              <option className="" value="Service Request">
                Service Request
              </option>
              <option className="" value="Incident">
                Incident
              </option>
              <option className="" value="Change">
                Request for Change
              </option>
            </select>
          </div>
        </div>

        <div className="flex flex-col mt-5 border-b-[2px] pb-2 border-blue-200">
          <p className="font-semibold">Ticket Title</p>
          <input
            maxLength={199}
            className="flex mx-0.5 mt-1 p-1"
            placeholder="Enter title here...."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </div>

        {type !== "Change" ? (
          <div className="flex mt-7 border-b-[2px] pb-2 border-blue-200">
            <h1 className="font-semibold">Assigned Team:</h1>
            <div className="flex grow justify-end">
              <select
                className="hover:cursor-pointer"
                id="assignedTeam"
                onChange={handleTeamAssignment}
              >
                {companyTeams.length
                  ? companyTeams.map((team, index) => {
                      if (index === 0) {
                        return;
                      }
                      return (
                        <option key={index} value={team} className="">
                          {team}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
          </div>
        ) : null}

        {type === "Change" || type === "Incident" ? (
          <div>
            <div className="flex mt-8 border-b-[2px] pb-2 border-blue-200">
              <p className="font-semibold">Involved Teams: </p>
              <div className="flex justify-end grow">
                <select
                  defaultValue="Add Teams Here"
                  className="hover:cursor-pointer"
                  size={1}
                  id="team"
                  onChange={async (e) => {
                    handleAddTeamClick(e, await handleAddTeam());
                  }}
                >
                  {companyTeams.length
                    ? companyTeams.map((team, index) => {
                        if (involvedTeams.includes(team)) {
                          return;
                        }

                        if (index === 0) {
                          return <option key={index}>Add Teams Here</option>;
                        }

                        return (
                          <option key={index} value={team}>
                            {team}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
            </div>
            {involvedTeams.length > 0 ? (
              <div className="flex flex-wrap justify-center mt-5 text-sm">
                {involvedTeams.map((team, index) => {
                  return (
                    <div
                      className="flex bg-slate-600 px-4 my-0.5 py-0.5 rounded-br-full rounded-tl-full text-white"
                      key={index}
                    >
                      <p>{team}</p>
                      <MdRemoveCircle
                        className="text-lg mt-[1px] ml-2"
                        onClick={async (e) => {
                          await handleRemoveTeam(e, team);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        ) : null}

        {type === "Service Request" ? (
          <div className="flex mt-8">
            <p className="font-semibold">Complete By:</p>
            <input
              maxLength={50}
              type="datetime-local"
              className="bg-slate-100 grow mx-2 px-1 rounded-sm shadow-md"
              placeholder="MM/DD/YYYY HH:MMam"
              onChange={(e) => convertToDateCompleteBy(e.target.value)}
            ></input>
          </div>
        ) : null}

        {type === "Change" ? (
          <div className=" mt-7">
            <div className="flex">
              <p className="font-semibold whitespace-nowrap">Change Start: </p>

              <input
                maxLength={50}
                type="datetime-local"
                className="bg-slate-100 grow mx-2 px-2 shadow-md rounded-sm"
                placeholder="MM/DD/YYYY HH:MM"
                onChange={(e) => convertToDateImpStart(e.target.value)}
              ></input>
            </div>
            <div className="flex mt-3">
              <p className="font-semibold whitespace-nowrap">Change End: </p>

              <input
                maxLength={50}
                type="datetime-local"
                className="bg-slate-100 grow ml-[13px] mr-2 px-2 shadow-md rounded-sm"
                placeholder="MM/DD/YYYY HH:MM"
                onChange={(e) => convertToDateImpEnd(e.target.value)}
              ></input>
            </div>
          </div>
        ) : null}

        {type === "Change" || type === "Incident" ? (
          <div className="flex mt-7">
            <p className="font-semibold mr-3">Related Ticket: </p>
            <input
              type="text"
              className="bg-slate-100 shadow-md grow mr-2 px-2"
              placeholder="Related Ticket #"
              onChange={(e) => setRelatedTicket(e.target.value)}
            ></input>
          </div>
        ) : null}

        {type === "Change" ? (
          <div className="flex flex-col mt-4">
            <div className="flex">
              {" "}
              <p className="font-semibold pr-2">Emergency Change</p>
              <input
                type="checkbox"
                className="mt-0.5"
                onChange={() => setEmergency(!emergency)}
              ></input>
            </div>
            <div className="flex mt-3">
              <p className="font-semibold pr-2">Elevated Access Required</p>
              <input
                type="checkbox"
                className="mt-0.5"
                onChange={() => setAccessRequired(!accessRequired)}
              ></input>
              {accessRequired ? (
                <select
                  id="accessDescription"
                  className="ml-2 border-[1px] rounded-md"
                  onChange={handleSelectOfAccess}
                >
                  <option value=""></option>
                  <option value="ADGroupOne">ADGroupOne</option>
                  <option value="ADGroupTwo">ADGroupTwo</option>
                  <option value="ADGroupThree">ADGroupThree</option>
                  <option value="ADGroupFour">ADGroupFour</option>
                </select>
              ) : null}
            </div>
          </div>
        ) : null}

        {type !== "Event" && type !== "Change" ? (
          <div className="flex border-b-[2px] pb-2 border-blue-200 mt-9 justify-between">
            <div className="flex">
              <p className="font-semibold">Priority: </p>
              <select
                className="ml-3 px-2 text-base hover:cursor-pointer"
                id="priority"
                onChange={handlePrioritySelect}
              >
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </div>

            <div className="flex font-semibold">
              <p>Page</p>
              <input
                type="checkbox"
                className="mt-0.5 ml-1.5 hover:cursor-pointer"
                onClick={() => setIsPaging(!isPaging)}
              ></input>
            </div>

            <div className="flex font-semibold mr-2">
              {type !== "Service Request" ? (
                <div className="flex">
                  <p>Master Ticket</p>
                  <input
                    type="checkbox"
                    className="mt-0.5 ml-1.5 hover:cursor-pointer"
                    onClick={() => setIsMaster(!isMaster)}
                  ></input>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="flex mt-3 px-1">
          <textarea
            maxLength={1999}
            className="grow flex bg-slate-100 shadow-lg min-h-[180px] rounded-sm px-1.5 pt-[2px] mt-5 hover:cursor-pointer"
            placeholder="Enter ticket details here..."
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row mt-5 px-1">
          <p className="text-sm border-b-2 mb-2 sm:mb-0 border-blue-700 mr-2">
            Upload Attachment:{" "}
          </p>
          <input
            type="file"
            className="text-sm max-w-[180px]"
            onChange={handleFileChange}
          ></input>
          <div className="flex justify-end grow">
            <button className="border-2 px-3 text-green-500 rounded-md border-green-400">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TicketCreation;
