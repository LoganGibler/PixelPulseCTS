import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TbAlertTriangle } from "react-icons/tb";
import PassReset from "./PassReset";

import { loginUser } from "../api/user";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showLoginError, setShowLoginError] = useState(false);
	const [showPassReset, setShowPassReset] = useState(false);
	const [showPasswordResetSuccess, setShowPasswordResetSuccess] =
		useState(false);
	const navigate = useNavigate();

	return (
		<div className="flex justify-center px-4">
			<form
				className="flex flex-col"
				onSubmit={async (e) => {
					e.preventDefault();
					const user = await loginUser(email, password);
					if (user !== undefined) {
						if (password === import.meta.env.VITE_REACT_APP_PASS_CHECK) {
							setShowPassReset(true);
						} else {
							setIsLoggedIn(true);
							navigate("/Dashboard");
							window.location.reload();
						}
					} else {
						setShowLoginError(true);
					}
				}}
			>
				<div className="flex flex-col bg-white sm:w-[400px] rounded-2xl shadow-2xl overflow-hidden">
					{/* Gradient header */}
					<div className="bg-gradient px-8 py-8">
						<h1 className="font-bold text-3xl text-white text-center tracking-wide">PixelPulse</h1>
						<p className="text-white/75 text-sm text-center mt-1 font-medium">Customer Ticketing System</p>
					</div>

					{/* Form body */}
					<div className="px-8 py-7">
						<h2 className="font-semibold text-lg text-slate-700 mb-6">Sign in to your account</h2>

						<label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</label>
						<div className="flex border-b-2 border-slate-200 pb-2 pt-2 text-slate-400 focus-within:border-indigo-400 transition-colors mb-4">
							<FaUserAlt className="text-base mt-2 mr-2 flex-shrink-0" />
							<input
								type="Email"
								placeholder="Type your email"
								className="px-1 grow py-1 outline-none bg-transparent text-slate-700 placeholder-slate-300"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							></input>
						</div>

						<label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Password</label>
						<div className="flex border-b-2 border-slate-200 pb-2 pt-2 text-slate-400 focus-within:border-indigo-400 transition-colors mb-2">
							<MdLock className="text-lg mt-2 mr-2 flex-shrink-0" />
							<input
								type="Password"
								placeholder="Type your password"
								className="px-1 bg-white grow py-1 outline-none text-slate-700 placeholder-slate-300"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							></input>
						</div>

						{!showPassReset ? (
							<button className="w-full rounded-xl bg-gradient py-3 mt-6 text-white tracking-wider font-semibold hover:cursor-pointer hover:opacity-90 duration-200 transition-opacity shadow-md">
								LOGIN
							</button>
						) : null}

						<div className="flex flex-col text-sm mt-5 text-slate-400 bg-slate-50 rounded-xl p-4 border border-slate-100">
							<p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Demo Credentials</p>
							<p>
								<span className="text-slate-600 font-semibold">User: </span>
								SampleUser@pixelpulse.tech
							</p>
							<p className="mt-1">
								<span className="text-slate-600 font-semibold">Pass: </span> Password3!
							</p>
						</div>

						{showLoginError ? (
							<div className="flex justify-center mt-4">
								<div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
									<TbAlertTriangle className="text-red-500 text-lg flex-shrink-0" />
									<p className="text-red-600 text-sm font-medium">Invalid email or password</p>
								</div>
							</div>
						) : null}

						{showPassReset ? (
							<PassReset
								email={email}
								showPasswordResetSuccess={showPasswordResetSuccess}
								setShowPasswordResetSuccess={setShowPasswordResetSuccess}
								setShowPassReset={setShowPassReset}
							/>
						) : null}

						{showPasswordResetSuccess ? (
							<p className="text-sm mt-3 text-green-600 font-medium">
								Password reset successful. Please login again.
							</p>
						) : null}
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
