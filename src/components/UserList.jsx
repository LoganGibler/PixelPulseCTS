import React, { useEffect, useState } from "react";
import { userList, searchUser, createUser } from "../api/user";
import { CgProfile } from "react-icons/cg";
import { IoSearchSharp } from "react-icons/io5";
import { FaPager } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdRemoveCircle } from "react-icons/md";

const UserList = ({
  userData,
  setCreateUserActive,
  createUserActive,
  companyTeams,
}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState([]);
  const [officePhone, setOfficePhone] = useState("");
  const [pagerPhone, setPagerPhone] = useState("");
  const [role, setRole] = useState("user");

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  console.log(userData);
  // const [searchResult, setSearchResult] = useState([]);

  const fetchUserList = async () => {
    const user_list = await userList();
    setUsers(user_list);
  };

  const handleUserSearch = async (search) => {
    setSearch(search);
    // console.log(search);
    await runSearch(search);
  };

  const runSearch = async (search) => {
    const searchResult = await searchUser(search);
    // console.log("Here is search result: ", searchResult);
    setUsers(searchResult);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div className="flex flex-col justify-center sm:text-sm">
      <div className="flex bg-slate-700 py-1.5 px-3 md:px-7">
        <p className=" text-white font-semibold mt-[2px] flex">
          <CgProfile className="text-xl mt-[1px] mr-2" /> All Associates
        </p>
        <div className="flex justify-end grow bg-slate-700">
          <div>
            <div className="flex">
              <IoSearchSharp className=" text-xl text-white mt-[5px] mr-1" />
              <input
                className="rounded-md w-[150px] md:w-[250px] px-2 text-white text-sm sm:text-base bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                type="text"
                placeholder="Search users here...."
                onChange={(e) => {
                  handleUserSearch(e.target.value);
                }}
              ></input>
              {userData && userData.role && userData.role.includes("admin") ? (
                <button
                  className="hidden sm:flex bg-white py-[1px] text-blue-700 border-2 border-blue-700 rounded-md px-2"
                  onClick={() => setCreateUserActive(true)}
                >
                  Create User
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="grow">
        {users.length ? (
          users.map((user, index) => {
            console.log(user);

            return (
              <div
                key={index}
                className="flex-col flex py-2 px-5 border-b-[1px] border-[rgba(65,96,199,1)] hover:cursor-pointer hover:bg-slate-200"
              >
                <div className="flex justify-between">
                  <p className="w-[160px] mt-[2px] flex text-ellipsis overflow-hidden whitespace-nowrap">
                    <CgProfile className="mt-[3px] mr-2 text-blue-700" />
                    {user.name}
                  </p>
                  <p className="w-[220px] mt-[2px] text-ellipsis overflow-hidden whitespace-nowrap">
                    {user.email}
                  </p>
                  <div className=" hidden lg:flex whitespace-nowrap w-[400px] overflow-hidden text-ellipsis">
                    {user.team.map((team, index) => {
                      return (
                        <p
                          key={index}
                          className="bg-slate-700 text-white py-0.5 mx-1 px-2 rounded-lg whitespace-nowrap overflow-hidden text-ellipsis"
                        >
                          {team}
                        </p>
                      );
                    })}
                  </div>
                  <p className="hidden md:flex w-[220px] text-ellipsis mt-[2px]  overflow-hidden whitespace-nowrap">
                    <HiOutlineBuildingOffice2 className="mr-1.5 mt-[1px] text-xl text-blue-700" />
                    {user.officePhone}
                  </p>
                  <p className="hidden lg:flex w-[220px] text-ellipsis mt-[2px] overflow-hidden whitespace-nowrap">
                    <FaPager className="text-xl mt-[1px] mr-1.5 text-blue-700" />
                    {user.pagerPhone}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center mt-2">
            <p>No users found.</p>
          </div>
        )}
      </div>
      {createUserActive ? (
        <div className="flex justify-center">
          <form
            className="absolute min-w-[350px] top-[2rem] sm:top-[8rem] flex flex-col bg-white z-10 px-4 py-7 rounded-md"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const username = firstname + " " + lastname;
                const createdUser = await createUser(
                  username,
                  email,
                  team,
                  officePhone,
                  pagerPhone,
                  role
                );
                if (createdUser) {
                  setCreateUserActive(false);
                  await fetchUserList();
                  alert(
                    "User created successfully. They have been emailed their temporary password."
                  );
                }
              } catch (error) {
                throw error;
              }
            }}
          >
            <div className="flex flex-col sm:flex-row">
              <p className="pb-1 px-1 mr-2 border-b-2 border-blue-700">
                Firstname:{" "}
              </p>
              <div className="flex mt-3 sm:mt-0 sm:justify-end sm:grow">
                {" "}
                <input
                  className="bg-slate-100 border-2 w-[250px] indent-2"
                  onChange={(e) => setFirstname(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row mt-5">
              <p className="pb-1 px-1 mr-2 border-b-2 border-blue-700">
                Lastname:{" "}
              </p>
              <div className="flex mt-3 sm:justify-end sm:grow sm:mt-0">
                {" "}
                <input
                  className="bg-slate-100 border-2 w-[250px] indent-2"
                  onChange={(e) => setLastname(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row mt-5">
              <p className="pb-1 px-1 mr-3 border-b-2 border-blue-700">
                Email:{" "}
              </p>
              <div className="flex mt-3 sm:mt-0 sm:justify-end sm:grow">
                <input
                  type="Email"
                  className="bg-slate-100 border-2 w-[250px] indent-2"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row mt-5">
              <p className="pb-1 border-b-2 border-blue-700">Add user team: </p>
              <select
                className="bg-slate-100 mt-3 sm:mt-0 border-2 sm:grow flex ml-2 hover:cursor-pointer"
                value={""}
                onChange={(e) => setTeam([...team, e.target.value])}
              >
                {companyTeams.length
                  ? companyTeams.map((teams, index) => {
                      if (team.includes(teams)) {
                        return;
                      }
                      return (
                        <option key={index} className="bg-slate-100">
                          {teams}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div className="flex flex-wrap mt-2 max-w-[335px]">
              {team.length
                ? team.map((teams, index) => {
                    return (
                      <p
                        className="bg-slate-700 flex rounded-full my-1 py-[1px] px-3 text-white hover:cursor-pointer"
                        key={index}
                        onClick={(e) => {
                          const newTeam = team.filter((team) => team !== teams);
                          setTeam(newTeam);
                        }}
                      >
                        {teams}
                        <MdRemoveCircle className="mt-1 ml-1" />
                      </p>
                    );
                  })
                : null}
            </div>
            <div className="flex flex-col sm:flex-row mt-5">
              <p className="pb-1 px-1 mr-2 border-b-2 border-blue-700">
                Office Phone:{" "}
              </p>
              <input
                className="bg-slate-100 mt-3 sm:mt-0 border-2 w-[250px] indent-2"
                onChange={(e) => setOfficePhone(e.target.value)}
                placeholder="(+1) 555-555-5555"
              ></input>
            </div>
            <div className="flex flex-col sm:flex-row mt-5">
              <p className="pb-1 px-1 mr-2 border-b-2 border-blue-700">
                Pager Phone:{" "}
              </p>
              <input
                className="bg-slate-100 mt-3 sm:mt-0 border-2 w-[250px] indent-2"
                onChange={(e) => setPagerPhone(e.target.value)}
                placeholder="(+1) 555-555-5555"
              ></input>
            </div>
            <div className="flex mt-5 px-0.5">
              <p className="mr-[25px] pb-1 border-b-2 border-blue-700">
                Select Role:{" "}
              </p>

              <select className="bg-slate-100 border-2 flex grow hover:cursor-pointer">
                <option value="admin" className="bg-slate-100">
                  Admin
                </option>
                <option value="user" className="bg-slate-100">
                  User
                </option>
                <option value="CAB approver" className="bg-slate-100">
                  CAB Approver
                </option>
              </select>
            </div>
            <button className="rounded-md py-1.5 bg-blue-700 text-white mt-8">
              Create User
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default UserList;
