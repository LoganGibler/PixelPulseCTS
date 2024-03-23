import React, { useState, useEffect } from "react";
import { RiTeamLine } from "react-icons/ri";
import { getTeams } from "../api/company";
import { FaPager } from "react-icons/fa6";
import { useNavigate } from "react-router";

const TeamsList = ({ userData, companyTeams }) => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    const teams = await getTeams();
    // console.log(teams);
    setTeams(teams);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <div className="flex justify-center grow">
        <div className="flex flex-col grow">
          <div className="flex bg-slate-700 px-4 py-1">
            <RiTeamLine className="text-white text-xl mr-2 mt-1" />
            <h1 className="text-white text-lg font-semibold">All Teams</h1>
          </div>
          <div className="flex flex-col">
            {teams.length ? (
              teams.map((team, index) => {
                console.log(team);
                return (
                  <div
                    className="flex justify-between px-5 py-1.5 border-b-[1px] border-blue-700 hover:cursor-pointer hover:bg-slate-200"
                    key={index}
                    onClick={() => {
                      navigate("/team/" + team._id);
                    }}
                  >
                    <p className="font-semibold">{team.teamName}</p>
                    <p className="hidden sm:flex">{team.teamEmail}</p>
                    <div className="hidden sm:flex">
                      <FaPager className="mr-1 text-lg mt-[3px] text-blue-700" />
                      <p>{team.teamPager}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center">
                <p>
                  No Teams have been found. Please contact your administrator.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsList;
