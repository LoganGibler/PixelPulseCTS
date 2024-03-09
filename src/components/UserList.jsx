import React, { useEffect, useState } from "react";
import { userList } from "../api/user";
import { CgProfile } from "react-icons/cg";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const fetchUserList = async () => {
    const user_list = await userList();
    setUsers(user_list);
  };
  useEffect(() => {
    fetchUserList();
  }, []);
  return (
    <div className="flex justify-center">
      <div className="grow px-5 py-4">
        {users.length
          ? users.map((user, index) => {
              console.log(user);
              return (
                <div
                  key={index}
                  className="flex-col flex py-2 border-b-[1px] border-[rgba(65,96,199,1)]"
                >
                  <div className="flex">
                    <CgProfile />
                    <p>{user.name}</p>
                    <div className="flex grow justify-end">
                      <p>Team: {user.team[0]}</p>
                    </div>
                  </div>
                  <div className="flex mt-1">
                    <p>Office: {user.officePhone}</p>
                    <div className="flex grow justify-end">
                      <p>Pager: {user.pagerPhone}</p>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default UserList;
