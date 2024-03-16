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
    // console.log(userData, "This is userData.");
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
    <div className="bg-gradient flex px-6 py-3 z-20">
      <h1 className="text-white font-semibold text-xl">PixelPulse CTS</h1>
      <div className="flex justify-end grow text-white text-[24px] mt-[2px] md:hidden">
        {!mobileMenuActive ? (
          <RiMenu3Line className="" onClick={handleHamburgerClick} />
        ) : (
          <RiCloseLine className="" onClick={handleHamburgerClick} />
        )}
      </div>
      <div className="hidden md:flex grow justify-end text-slate-100 font-semibold mt-[4px] ml-0">
        <p
          className="mx-1.5 px-2 hover:text-slate-200 hover:cursor-pointer"
          onClick={(e) => setCreateTicketActive(true)}
        >
          Create Ticket
        </p>
        <p
          className="mx-1.5 px-2 hover:text-slate-200 hover:cursor-pointer"
          onClick={(e) => navigate("/Dashboard")}
        >
          Team Dashboard
        </p>
        <p
          className="mx-1.5 px-2 hover:text-slate-200 hover:cursor-pointer"
          onClick={() => navigate("/AllChanges")}
        >
          Changes
        </p>
        <div className=" flex lg:hidden">
          <p
            className="mx-1 px-2 hover:text-slate-200 hover:cursor-pointer"
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
      <div className="hidden lg:flex text-slate-100 font-semibold mt-[4px]">
        <p
          className="mx-1 px-2 hover:text-slate-200 hover:cursor-pointer"
          onClick={(e) => navigate("/AllIncidents")}
        >
          Incidents
        </p>
        <p
          className="mx-1 px-2 hover:text-slate-200 hover:cursor-pointer"
          onClick={() => navigate("/AllServiceRequests")}
        >
          Service Requests
        </p>
        <div>
          <p
            className="mx-1 px-2 hover:text-slate-200 hover:cursor-pointer"
            onClick={(e) => setMoreMenuActive(!moreMenuActive)}
          >
            More...
          </p>
          {moreMenuActive ? (
            <MoreMenu
              moreMenuActive={moreMenuActive}
              setMoreMenuActive={setMoreMenuActive}
              // onClick={() => setMoreMenuActive(!moreMenuActive)}
            />
          ) : null}
        </div>
      </div>
      <div className=" hidden md:flex flex-col grow">
        <div
          className="hidden md:flex grow justify-end text-slate-100 text-xs hover:cursor-pointer"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <CgProfile className="text-2xl mt-1 mr-2" />
          <div>
            <p className="font-semibold">{username}</p>
            <p>{team}</p>
          </div>
        </div>

        {showUserMenu ? (
          <div className="absolute w-[150px] z-10 bg-slate-100 mt-10 right-1 px-2 rounded-sm pb-2">
            <div className="flex flex-col justify-center">
              {" "}
              <p
                className="py-1 hover:cursor-pointer"
                onClick={() => {
                  navigate("/user/" + userData._id);
                  setShowUserMenu(false);
                }}
              >
                Profile
              </p>
              <p className="py-1 hover:cursor-pointer">Manage Team</p>
              <button
                className="bg-gradient py-1 mt-2 rounded-md text-white"
                onClick={async (e) => {
                  await deleteAllCookies();
                  setIsLoggedIn(false);
                  setShowUserMenu(false);
                  navigate("/");
                }}
              >
                Signout
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
