import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTeamById } from "../api/company";
import { getTeamMembers } from "../api/user";
import { AiOutlineMail } from "react-icons/ai";
import { FaPager } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";

const TeamView = () => {
  const { id } = useParams();
  const [team, setTeam] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  const fetchTeamData = async (id) => {
    const fetchedTeam = await getTeamById(id);
    setTeam(fetchedTeam);
    const teamMembers = await getTeamMembers(fetchedTeam.teamName);
    setTeamMembers(teamMembers);
  };

  useEffect(() => {
    fetchTeamData(id);
  }, []);

  if (!team) {
    return (
      <div className="flex justify-center mt-5">
        <p>No Team found with that ID.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-slate-100 min-h-screen">
      <div className="flex grow max-w-[1000px] bg-white">
        <div className="flex flex-col grow px-4">
          <div>
            <p className="font-semibold text-lg mt-10 px-2 border-b-2 pb-1.5 border-blue-700">
              {team.teamName}
            </p>
          </div>
          <div className="flex mt-5">
            <p className="text-blue-700 mr-2">Team Email: </p>
            <p>{team.teamEmail}</p>
          </div>
          <div className="flex mt-3">
            <p className="text-blue-700 mr-2">Team Pager: </p>
            <p>{team.teamPager}</p>
          </div>
          <div className="flex flex-col mt-5">
            <p className="pb-1 border-b-[1px] border-slate-700">
              Team Members{" "}
            </p>
            <div className="px-3 mt-2">
              {teamMembers.length ? (
                teamMembers.map((member, index) => {
                  return (
                    <div
                      key={index}
                      className="flex my-1 py-1 bg-slate-100 hover:cursor-pointer hover:bg-white px-2 rounded-md border-2"
                    >
                      <CgProfile className="text-blue-700 mt-[4px] text-lg mr-2" />
                      <p className="font-semibold"> {member.name}</p>

                      <div className="flex grow justify-end">
                        <div className="flex w-[260px]">
                          <AiOutlineMail className="text-blue-700 mt-1 mr-1" />
                          <p>{member.email}</p>
                        </div>
                        <div className="flex ml-1 w-[180px]">
                          <FaPager className="text-blue-700 mr-1 mt-[4px]" />
                          <p>{member.pagerPhone}</p>
                        </div>
                        <div className="flex w-[150px]">
                          <HiOutlineBuildingOffice2 className="text-blue-700 mr-1 mt-[4px]" />
                          <p>{member.officePhone}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>No Teammembers found.</div>
              )}
            </div>
          </div>
          <div className="flex flex-col mt-10 border-b-2 pb-4">
            <p className=""></p>
            <p className="">{team.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamView;
