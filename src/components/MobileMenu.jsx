import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { RiCloseLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { IoCreateSharp } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { TbAlertTriangle } from "react-icons/tb";
import { RiTeamLine } from "react-icons/ri";
import { SiMicrosoftteams } from "react-icons/si";
import { TbExchange } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const MobileMenu = ({
  mobileMenuActive,
  setMobileMenuActive,
  setCreateTicketActive,
  setIsLoggedIn,
}) => {
  const navigate = useNavigate();
  const handleMenuClick = async () => {
    setMobileMenuActive(!mobileMenuActive);
  };

  const handleNavigate = (e, route) => {
    navigate(route);
    setMobileMenuActive(false);
  };

  async function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  return (
    <Transition
      appear={true}
      show={mobileMenuActive}
      enter="transition-all duration-400"
      enterFrom="-ml-[20rem]"
      enterTo=""
      leave="transition-all duration-400"
      leaveTo="-ml-[20rem]"
    >
      <div className="fixed top-0 bottom-0 w-[300px] bg-gray-50 flex flex-col z-20">
        <div className="flex border-b-[2px] border-slate-700 py-2 text-lg font-semibold px-2">
          <h1 className="">PixelPulseCTS</h1>
          <div className="flex grow justify-end">
            <RiCloseLine
              className="text-2xl mt-0.5"
              onClick={handleMenuClick}
            />
          </div>
        </div>

        <div className="border-b-[2px] py-5 border-slate-200">
          <div
            className="flex py-2 px-3"
            onClick={async (e) => {
              setCreateTicketActive(true);
              setMobileMenuActive(false);
            }}
          >
            <p>Create Ticket</p>
            <div className="flex grow justify-end">
              <IoCreateSharp className="text-2xl text-blue-600" />
            </div>
          </div>

          <div
            className="flex px-3 py-2"
            onClick={async (e) => handleNavigate(e, "/Dashboard")}
          >
            <p>Team Dashboard</p>
            <div className="flex grow justify-end">
              <MdSpaceDashboard className="text-2xl text-blue-600 mr-0.5" />
            </div>
          </div>
        </div>

        <div className="py-4">
          <div
            className="flex px-3 py-2"
            onClick={() => {
              navigate("/AllIncidents");
              setMobileMenuActive(false);
            }}
          >
            <TbAlertTriangle className="text-2xl text-blue-600 mr-0.5" />
            <div className="flex grow justify-end">
              <p>All Incidents</p>
              <IoIosArrowForward className="text-base mt-[5px] ml-3" />
            </div>
          </div>

          <div
            className="flex px-3 py-2 my-3"
            onClick={() => {
              navigate("/AllServiceRequests");
              setMobileMenuActive(false);
            }}
          >
            <BiTask className="text-2xl text-blue-600 mr-0.5" />
            <div className="flex grow justify-end">
              <p>All Service Requests</p>
              <IoIosArrowForward className="text-base mt-[5px] ml-3" />
            </div>
          </div>

          <div
            className="flex px-3 py-2 my-3"
            onClick={() => {
              navigate("/AllChanges");
              setMobileMenuActive(false);
            }}
          >
            <TbExchange className="text-2xl text-blue-600 mr-0.5" />
            <div className="flex grow justify-end">
              <p>All Changes</p>
              <IoIosArrowForward className="text-base mt-[5px] ml-3" />
            </div>
          </div>

          <div
            className="flex px-3 py-2 my-3"
            onClick={() => {
              navigate("/AllTeams");
              setMobileMenuActive(false);
            }}
          >
            <SiMicrosoftteams className="text-2xl text-blue-600 mr-0.5" />
            <div className="flex grow justify-end">
              <p>All Teams</p>
              <IoIosArrowForward className="text-base mt-[5px] ml-3" />
            </div>
          </div>

          <div
            className="flex px-3 py-2 my-3"
            onClick={() => {
              navigate("/UserList");
              setMobileMenuActive(false);
            }}
          >
            <RiTeamLine className="text-2xl text-blue-600 mr-0.5" />
            <div className="flex grow justify-end">
              <p>All Users</p>
              <IoIosArrowForward className="text-base mt-[5px] ml-3" />
            </div>
          </div>
        </div>
        <div className="flex grow justify-center">
          <div>
            {" "}
            <button
              onClick={async () => {
                await deleteAllCookies();
                setIsLoggedIn(false);
                setMobileMenuActive(false);
                navigate("/");
              }}
              className="rounded-2xl w-[100px] bg-gradient py-1.5 mt-5 text-white tracking-wider hover:cursor-pointer transition ease-in-out delay-50ms bg-blue-500 hover:scale-105 hover:bg-indigo-500 duration-300"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default MobileMenu;
