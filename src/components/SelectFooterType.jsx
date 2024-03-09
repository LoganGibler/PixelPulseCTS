import React from "react";
import { BiSolidCommentAdd } from "react-icons/bi";

const SelectFooterType = ({
  activeTicketFooter,
  setActiveTicketFooter,
  setCreateCommentActive,
  type,
  createTaskActive,
  setCreateTaskActive,
  fetchTicketInfo,
}) => {
  return (
    <div className="flex grow text-sm ml-1 mt-[4rem]">
      <p
        className={
          activeTicketFooter === "Comments"
            ? "mr-4 text-blue-700 font-semibold hover:cursor-pointer mt-1"
            : "mr-4 hover:cursor-pointer mt-1"
        }
        onClick={() => {
          setActiveTicketFooter("Comments");
        }}
      >
        Comments
      </p>
      {type === "Change" ? (
        <p
          className={
            activeTicketFooter === "Tasks"
              ? "mr-4 text-blue-700 font-semibold hover:cursor-pointer mt-1"
              : "mr-4 hover:cursor-pointer mt-1"
          }
          onClick={() => {
            setActiveTicketFooter("Tasks");
          }}
        >
          Tasks
        </p>
      ) : null}

      <p
        className={
          activeTicketFooter === "AuditLog"
            ? "mr-4 text-blue-700 font-semibold hover:cursor-pointer mt-1"
            : "mr-4 hover:cursor-pointer mt-1"
        }
        onClick={() => {
          setActiveTicketFooter("AuditLog");
        }}
      >
        AuditLog
      </p>
      {/* <p
        className={
          activeTicketFooter === "Linked Tickets"
            ? "mr-4 text-blue-700 font-semibold hover:cursor-pointer mt-1"
            : "mr-4 hover:cursor-pointer mt-1"
        }
        onClick={() => {
          setActiveTicketFooter("Linked Tickets");
        }}
      >
        Linked Tickets
      </p> */}
      {activeTicketFooter === "Tasks" ? (
        <div className="flex justify-end grow">
          <button
            className="border-2 flex border-green-500 px-2 py-1 rounded-md text-green-500"
            onClick={async () => {
              setCreateTaskActive(true);
              await fetchTicketInfo();
            }}
          >
            Add Task
            {/* <BiSolidCommentAdd className="ml-1.5 text-lg mt-[3px]" /> */}
          </button>
        </div>
      ) : null}
      {activeTicketFooter === "Comments" ? (
        <div className="flex justify-end grow">
          <button
            className="border-2 flex border-green-500 px-2 py-1 rounded-md text-green-500 whitespace-nowrap"
            onClick={() => setCreateCommentActive(true)}
          >
            Add Comment
            <BiSolidCommentAdd className="ml-1.5 text-lg mt-[3px]" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default SelectFooterType;
