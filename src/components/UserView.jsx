import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getUserDetails, getTeamData, getTeamMembers } from "../api/user";
import { FaPager } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { useNavigate } from "react-router";

const UserView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userValues, setUserValues] = useState({
    active: true,
    email: "",
    name: "",
    officePhone: "",
    pagerPhone: "",
    role: [],
    team: [],
    _id: "",
  });

  const [userTeamsInfo, setUserTeamsInfo] = useState([]);
  const [associatedUsers, setAssociatedUsers] = useState([]);

  const fetchUserDetails = async (id) => {
    const user = await getUserDetails(id);
    setUserValues(user);

    fetchUsersTeamsInfo(user.team);
  };

  const fetchUsersTeamsInfo = async (teams) => {
    const userTeams = await getTeamData(teams);
    setUserTeamsInfo(userTeams);
    for (let i = 0; i < userTeams.length; i++) {
      const foundUsers = await getTeamMembers(teams[i]);
      setAssociatedUsers([...associatedUsers, foundUsers]);
    }
  };

  useEffect(() => {
    fetchUserDetails(id);
  }, [id]);

  return (
    <div className="flex justify-center bg-slate-100 min-h-screen">
      <div className="flex flex-col grow px-2 sm:px-6 max-w-[900px] bg-white mt-0 shadow py-5">
        <div className="flex">
          <CgProfile className="text-2xl text-slate-700 mr-2" />
          <p className="whitespace-nowrap flex">{userValues.name}</p>
        </div>
        <div className="flex flex-wrap mt-5">
          <div className="flex mb-1 mr-5">
            <p className="text-blue-700">
              Account ID: <span className="text-black">{userValues._id}</span>{" "}
            </p>
          </div>
          <div className="flex mt-0">
            <p className="text-blue-700">
              Account Status:{" "}
              <span className="text-black">
                {userValues.active ? "Active" : "Locked"}
              </span>{" "}
            </p>
          </div>
        </div>

        <p className="pb-1 mt-5 border-b-2 font-bold border-slate-700">
          Contact
        </p>

        <p className="text-blue-700 mt-2 flex">
          <AiOutlineMail className="text-xl text-blue-700 mr-1.5 mt-[2px]" />
          Email: <span className="text-black ml-2">
            {userValues.email}
          </span>{" "}
        </p>
        <p className="text-blue-700 mt-2 flex">
          <HiOutlineBuildingOffice2 className="text-xl mr-1.5" />
          Office Phone:{" "}
          <span className="text-black ml-2">{userValues.officePhone}</span>{" "}
        </p>
        <p className="text-blue-700 mt-2 flex">
          <FaPager className="text-xl mt-[2px] mr-1.5" />
          Pager Phone:{" "}
          <span className="text-black ml-2">{userValues.pagerPhone}</span>{" "}
        </p>
        {userTeamsInfo.length ? (
          <p className="pb-1 mt-5 border-b-2 font-bold border-slate-700">
            Team
          </p>
        ) : null}
        <div>
          {userTeamsInfo.length
            ? userTeamsInfo.map((team, index) => {
                return (
                  <div
                    className="px-4 py-2 border-2 mt-3 mb-3 rounded-md"
                    key={index}
                  >
                    <p className="font-bold">{team.teamName}</p>
                    <p className="text-blue-700 text-sm mt-2">
                      Team Email:{" "}
                      <span className="text-black ml-1">{team.teamEmail}</span>
                    </p>
                    <p className="text-blue-700 text-sm mt-2 flex">
                      Team Pager:{" "}
                      <span className="text-black ml-1">{team.teamPager}</span>
                    </p>
                    <p className="text-sm mt-3">{team.description}</p>
                    <p className="text-sm pb-2 border-b-2 border-blue-700 mt-5 mb-3">
                      Other Team members
                    </p>
                    {associatedUsers.length
                      ? associatedUsers[0].map((user, index) => {
                          if (!user.team.includes(team.teamName)) {
                            return;
                          }

                          {
                            if (userValues.name === user.name) {
                              return;
                            }
                          }
                          return (
                            <div
                              key={index}
                              onClick={() => navigate("/user/" + user._id)}
                              className="flex mt-0 text-sm border-b-[1px] py-1.5 px-2 hover:cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
                            >
                              <CgProfile className="text-xl text-blue-700 mr-2" />
                              <p>{user.name}</p>
                            </div>
                          );
                        })
                      : null}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default UserView;
