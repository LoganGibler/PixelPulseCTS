import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { TbAlertTriangle } from "react-icons/tb";

import { loginUser } from "../api/user";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginError, setShowLoginError] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center mt-[6rem]">
      <form
        className="flex flex-col py-2 "
        onSubmit={async (e) => {
          e.preventDefault();
          const user = await loginUser(email, password);
          console.log("This is user: ", user);
          // await fetchUserSession()
          if (user !== undefined) {
            setIsLoggedIn(true);
            navigate("/Dashboard");
            window.location.reload();
          } else {
            setShowLoginError(true);
          }
        }}
      >
        <div className="flex flex-col bg-white px-8 py-8 rounded-lg">
          <div className="flex justify-center">
            <h1 className="font-bold text-3xl">Sign in</h1>
          </div>
          <label className="text-sm mt-2">Email</label>
          <div className="flex border-b-[1px] border-slate-400 pb-2 pt-1 text-slate-400">
            <FaUserAlt className="text-lg mt-2 mr-1" />
            <input
              type="Email"
              placeholder="Type your email"
              className="px-2 py-1"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <label className="text-sm mt-3">Password</label>
          <div className="flex border-b-[1px] mt-0 border-slate-400 pb-2 pt-1 text-slate-400">
            <MdLock className="text-lg mt-2 mr-1" />
            <input
              type="Password"
              placeholder="Type your password"
              className="px-2 py-1"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <div className="flex justify-end text-sm mt-2">
            <p className="hover:cursor-pointer">Forgot password?</p>
          </div>

          <button className="rounded-2xl bg-gradient py-1.5 mt-5 text-white tracking-wider hover:cursor-pointer transition ease-in-out delay-50ms bg-blue-500 hover:scale-105 hover:bg-indigo-500 duration-300">
            LOGIN
          </button>

          {showLoginError ? (
            <div className="flex justify-center mt-4">
              <div className="flex">
                <TbAlertTriangle className="text-red-600 text-xl mt-1 mr-2" />{" "}
                <p>Invalid Login</p>
              </div>
            </div>
          ) : null}

          <div className="flex justify-center text-sm mt-7">
            <p>Or Sign in Using</p>
          </div>
          <div className="flex justify-center text-3xl mt-2">
            <AiFillGithub className="mx-[2px] hover:cursor-pointer" />
            <AiFillTwitterCircle className="mx-[2px] text-blue-300 hover:cursor-pointer" />
            <AiFillGoogleCircle className="mx-[2px] text-orange-700 hover:cursor-pointer" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
