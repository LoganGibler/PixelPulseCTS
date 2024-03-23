import React, { useState, useEffect } from "react";
import { resetPassword } from "../api/user";
import { GoCheckCircleFill } from "react-icons/go";
import { GoAlertFill } from "react-icons/go";

const PassReset = ({
  email,
  showPasswordResetSuccess,
  setShowPasswordResetSuccess,
  setShowPassReset,
}) => {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("a");
  const [showPasswordError, setShowPasswordError] = useState(false);

  return (
    <div className="flex flex-col text-sm max-w-[280px]">
      <h1 className="mt-4">
        This is your first time logging in. Please change your password:{" "}
      </h1>
      <div className="border-b-2 pb-2 flex flex-col mt-2">
        <label className="mt-2">New Password</label>
        <input
          type="password"
          className="px-2 py-1 mt-1"
          placeholder="New password"
          onChange={(e) => setNewPass(e.target.value)}
        ></input>
      </div>

      <div className="border-b-2 pb-2 flex flex-col mt-2">
        <label className="">Confirm Password</label>
        <input
          type="password"
          className="px-2 py-1 mt-1"
          placeholder="Confirm password"
          onChange={(e) => setConfirmPass(e.target.value)}
        ></input>
      </div>

      <div className="mt-2">
        {showPasswordError ? (
          <p className="flex">
            <GoAlertFill className="text-red-600 text-lg my-2 mt-[2px] mr-1" />{" "}
            Password reset failed. Please try again.
          </p>
        ) : null}
        {newPass.length < 7 ? (
          <p className="flex mt-1">
            <GoAlertFill className="text-red-600 text-lg mt-[2px] mr-1" />
            Password must be at least 7 characters
          </p>
        ) : null}
        {newPass.match(/[0-9]/) ? null : (
          <p className="flex mt-1">
            <GoAlertFill className="text-red-600 text-lg mt-[2px] mr-1" />
            Password must contain a number
          </p>
        )}
        {newPass.match(/[!@#$%^&*]/) ? null : (
          <p className="flex mt-1">
            <GoAlertFill className="text-red-600 text-lg mt-[2px] mr-1" />
            Password must contain a special character
          </p>
        )}
        {newPass !== confirmPass ? (
          <p className="flex mt-1">
            {" "}
            <GoAlertFill className="text-red-600 text-lg mt-[2px] mr-1" />
            Passwords must match
          </p>
        ) : null}

        {newPass.length >= 7 &&
        newPass.match(/[0-9]/) &&
        newPass.match(/[!@#$%^&*]/) &&
        newPass === confirmPass ? (
          <p className="flex">
            Password Good{" "}
            <GoCheckCircleFill className="text-green-500 ml-1 text-lg mt-[2px]" />
          </p>
        ) : null}
      </div>

      <button
        type="button"
        className="rounded-2xl bg-gradient py-1.5 mt-5 text-white tracking-wider hover:cursor-pointer transition ease-in-out delay-50ms bg-blue-500 hover:scale-105 hover:bg-indigo-500 duration-300"
        onClick={async (e) => {
          e.preventDefault();
          if (
            newPass.length >= 7 &&
            newPass.match(/[0-9]/) &&
            newPass.match(/[!@#$%^&*]/) &&
            newPass === confirmPass
          ) {
            const newPassword = await resetPassword(newPass, email);
            console.log("newPassword", newPassword);
            if (newPassword !== undefined) {
              setShowPasswordResetSuccess(true);
              setShowPassReset(false);
            } else {
              setShowPasswordError(true);
            }
          } else {
            setShowPasswordError(true);
          }
        }}
      >
        SUBMIT
      </button>
    </div>
  );
};

export default PassReset;
