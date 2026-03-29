import React, { useState, useEffect } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router";
import MoreMenu from "./MoreMenu";

const Navbar = ({
  mobileMenuActive,
  setMobileMenuActive,
  userData,
  showUserMenu,
  setShowUserMenu,
  setIsLoggedIn,
  moreMenuActive,
  setMoreMenuActive,
  createTicketActive,
  setCreateTicketActive,
}) => {
  const [username, setUsername] = useState("");
  const [team, setTeam] = useState("");
  const navigate = useNavigate();

  async function fetchUserData(userData) {
    if (!userData.name) {
      return;
    } else {
      setUsername(userData.name);
      setTeam(userData.team[0]);
    }
  }

  async function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  const handleHamburgerClick = (e) => {
    setMobileMenuActive(!mobileMenuActive);
  };

  useEffect(() => {
    fetchUserData(userData);
  }, [userData]);

  return (
    <div className="bg-gradient flex px-6 py-3 z-20 shadow-lg">
      <h1 className="text-white font-bold text-xl tracking-wide">PixelPulse CTS</h1>
      <div className="flex justify-end grow text-white text-[24px] mt-[2px] md:hidden">
        {!mobileMenuActive ? (
          <RiMenu3Line className="" onClick={handleHamburgerClick} />
        ) : (
          <RiCloseLine className="" onClick={handleHamburgerClick} />
        )}
      </div>
      <div className="hidden md:flex grow justify-end text-slate-100 font-semibold mt-[2px] ml-0 items-center">
        <p
          className="mx-1 px-3 py-1.5 rounded-full hover:bg-white/20 hover:cursor-pointer transition-all duration-200 text-sm"
          onClick={(e) => setCreateTicketActive(true)}
        >
          Create Ticket
        </p>
        <p
          className="mx-1 px-3 py-1.5 rounded-full hover:bg-white/20 hover:cursor-pointer transition-all duration-200 text-sm"
          onClick={(e) => navigate("/Dashboard")}
        >
          Team Dashboard
        </p>
        <p
          className="mx-1 px-3 py-1.5 rounded-full hover:bg-white/20 hover:cursor-pointer transition-all duration-200 text-sm"
          onClick={() => navigate("/AllChanges")}
        >
          Changes
        </p>
        <div className="flex lg:hidden">
          <p
            className="mx-1 px-3 py-1.5 rounded-full hover:bg-white/20 hover:cursor-pointer transition-all duration-200 text-sm"
            onClick={(e) => setMoreMenuActive(!moreMenuActive)}
          >
            More...
          </p>
          {moreMenuActive ? (
            <MoreMenu
              moreMenuActive={moreMenuActive}
              setMoreMenuActive={setMoreMenuActive}
            />
          ) : null}
        </div>
      </div>
      <div className="hidden lg:flex text-slate-100 font-semibold items-center">
        <p
          className="mx-1 px-3 py-1.5 rounded-full hover:bg-white/20 hover:cursor-pointer transition-all duration-200 text-sm"
          onClick={(e) => navigate("/AllIncidents")}
        >
          Incidents
        </p>
        <p
          className="mx-1 px-3 py-1.5 rounded-full hover:bg-white/20 hover:cursor-pointer transition-all duration-200 text-sm"
          onClick={() => navigate("/AllServiceRequests")}
        >
          Service Requests
        </p>
        <div>
          <p
            className="mx-1 px-3 py-1.5 rounded-full hover:bg-white/20 hover:cursor-pointer transition-all duration-200 text-sm"
            onClick={(e) => setMoreMenuActive(!moreMenuActive)}
          >
            More...
          </p>
          {moreMenuActive ? (
            <MoreMenu
              moreMenuActive={moreMenuActive}
              setMoreMenuActive={setMoreMenuActive}
            />
          ) : null}
        </div>
      </div>
      <div className="hidden md:flex flex-col grow">
        <div
          className="hidden md:flex grow justify-end text-slate-100 text-xs hover:cursor-pointer items-center"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/20 transition-all duration-200">
            <CgProfile className="text-2xl" />
            <div>
              <p className="font-semibold text-sm">{username}</p>
              <p className="text-white/70">{team}</p>
            </div>
          </div>
        </div>

        {showUserMenu ? (
          <div className="absolute w-[170px] z-10 bg-white mt-12 right-2 px-2 rounded-xl pb-3 pt-1 shadow-2xl border border-slate-100">
            <div className="flex flex-col">
              <p
                className="py-2 px-2 hover:cursor-pointer hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium text-slate-700"
                onClick={() => {
                  navigate("/user/" + userData._id);
                  setShowUserMenu(false);
                }}
              >
                Profile
              </p>
              <p className="py-2 px-2 hover:cursor-pointer hover:bg-slate-50 rounded-lg transition-colors text-sm font-medium text-slate-700">
                Manage Team
              </p>
              <button
                className="bg-gradient py-2 mt-1 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-opacity w-full"
                onClick={async (e) => {
                  await deleteAllCookies();
                  setIsLoggedIn(false);
                  setShowUserMenu(false);
                  navigate("/");
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
