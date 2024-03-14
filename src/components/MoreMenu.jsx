import React from "react";
import { useNavigate } from "react-router";

const MoreMenu = ({ moreMenuActive, setMoreMenuActive }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col absolute mt-8 lg:mt-2 rounded-br-lg rounded-bl-lg rounded-tr-lg bg-slate-100 text-black z-20">
      <p
        className="py-2 px-3 text-black hover:cursor-pointer hover:bg-slate-200 flex lg:hidden"
        onClick={(e) => {
          setMoreMenuActive(false);
          navigate("/AllIncidents");
        }}
      >
        Incidents
      </p>
      <p
        className="py-2 px-3 text-black hover:cursor-pointer hover:bg-slate-200 lg:hidden flex"
        onClick={(e) => {
          setMoreMenuActive(false);
          navigate("/AllServiceRequests");
        }}
      >
        Service Requests
      </p>
      <p
        className="py-2 px-3 text-black hover:cursor-pointer hover:bg-slate-200"
        onClick={(e) => {
          setMoreMenuActive(false);
          navigate("/UserList");
        }}
      >
        All Users
      </p>
      <p
        className="py-2 px-3 text-black hover:cursor-pointer hover:bg-slate-200"
        onClick={(e) => {
          setMoreMenuActive(false);
          navigate("/AllTeams");
        }}
      >
        All Teams
      </p>
    </div>
  );
};

export default MoreMenu;
