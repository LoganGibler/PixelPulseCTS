import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Navbar,
  Login,
  UserList,
  IncidentDash,
  ServiceReqDash,
  MobileMenu,
  TicketCreation,
  ChangeDashboard,
  AllIncidents,
  AllServiceRequests,
  AllChanges,
  UserView,
  TeamsList,
  TeamView,
} from "./components";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { testSession } from "./auth/auth";
import { getCompanyTeams } from "./api/company";
import { HomeDashboard, TicketView } from "./containers";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [companyTeams, setCompanyTeams] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [moreMenuActive, setMoreMenuActive] = useState(false);
  const [createTicketActive, setCreateTicketActive] = useState(false);
  const [createUserActive, setCreateUserActive] = useState(false);

  async function fetchCompanyTeams() {
    const fetchedTeams = await getCompanyTeams();
    setCompanyTeams(fetchedTeams);
  }

  async function fetchUserSession() {
    const response = await testSession();
    response ? setIsLoggedIn(true) : setIsLoggedIn(false);
    setUserData(response);
  }

  useEffect(() => {
    !isLoggedIn ? fetchUserSession() : null;
    isLoggedIn ? fetchCompanyTeams() : null;
    setIsLoading(false);
  }, [isLoggedIn]);

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={[
              <div
                key="LoginPage"
                className="flex grow justify-center bg-gradient min-h-screen"
              >
                <Login
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  userData={userData}
                  setUserData={setUserData}
                />
              </div>,
            ]}
          />
          <Route
            path="/AllIncidents"
            element={[
              <div hey="AllIncidents">
                <Navbar
                  mobileMenuActive={mobileMenuActive}
                  setMobileMenuActive={setMobileMenuActive}
                  userData={userData}
                  setShowUserMenu={setShowUserMenu}
                  showUserMenu={showUserMenu}
                  setIsLoggedIn={setIsLoggedIn}
                  moreMenuActive={moreMenuActive}
                  setMoreMenuActive={setMoreMenuActive}
                  createTicketActive={createTicketActive}
                  setCreateTicketActive={setCreateTicketActive}
                />
                <ProtectedRoute
                  element={AllIncidents}
                  userData={userData}
                  key="AllIncidentsKey"
                />
              </div>,
            ]}
          />

          <Route
            path="/AllChanges"
            element={[
              <div hey="AllChanges">
                <Navbar
                  mobileMenuActive={mobileMenuActive}
                  setMobileMenuActive={setMobileMenuActive}
                  userData={userData}
                  setShowUserMenu={setShowUserMenu}
                  showUserMenu={showUserMenu}
                  setIsLoggedIn={setIsLoggedIn}
                  moreMenuActive={moreMenuActive}
                  setMoreMenuActive={setMoreMenuActive}
                  createTicketActive={createTicketActive}
                  setCreateTicketActive={setCreateTicketActive}
                />
                <ProtectedRoute
                  element={AllChanges}
                  userData={userData}
                  key="allchangeskey"
                />
              </div>,
            ]}
          />

          <Route
            path="/AllServiceRequests"
            element={[
              <div key="AllServiceRequests">
                <Navbar
                  mobileMenuActive={mobileMenuActive}
                  setMobileMenuActive={setMobileMenuActive}
                  userData={userData}
                  setShowUserMenu={setShowUserMenu}
                  showUserMenu={showUserMenu}
                  setIsLoggedIn={setIsLoggedIn}
                  moreMenuActive={moreMenuActive}
                  setMoreMenuActive={setMoreMenuActive}
                  createTicketActive={createTicketActive}
                  setCreateTicketActive={setCreateTicketActive}
                />
                <ProtectedRoute
                  element={AllServiceRequests}
                  userData={userData}
                  key="allservkey"
                />
              </div>,
            ]}
          />
          <Route
            path="/Dashboard"
            element={[
              <div key="dashboardpage">
                <Navbar
                  mobileMenuActive={mobileMenuActive}
                  setMobileMenuActive={setMobileMenuActive}
                  userData={userData}
                  setShowUserMenu={setShowUserMenu}
                  showUserMenu={showUserMenu}
                  setIsLoggedIn={setIsLoggedIn}
                  moreMenuActive={moreMenuActive}
                  setMoreMenuActive={setMoreMenuActive}
                  createTicketActive={createTicketActive}
                  setCreateTicketActive={setCreateTicketActive}
                />
                <div className="flex">
                  <ProtectedRoute element={HomeDashboard} userData={userData} />
                </div>
              </div>,
            ]}
          />
          <Route
            path="/UserList"
            element={[
              <div key="userlistpage">
                <Navbar
                  mobileMenuActive={mobileMenuActive}
                  setMobileMenuActive={setMobileMenuActive}
                  userData={userData}
                  setShowUserMenu={setShowUserMenu}
                  showUserMenu={showUserMenu}
                  moreMenuActive={moreMenuActive}
                  setMoreMenuActive={setMoreMenuActive}
                  createTicketActive={createTicketActive}
                  setCreateTicketActive={setCreateTicketActive}
                  setIsLoggedIn={setIsLoggedIn}
                />
                <ProtectedRoute
                  element={UserList}
                  userData={userData}
                  setCreateUserActive={setCreateUserActive}
                  createUserActive={createUserActive}
                  companyTeams={companyTeams}
                />
              </div>,
            ]}
          />

          <Route
            path="/ticket/:ticketNumber"
            element={[
              <div key="createTicketpage" className="bg-slate-700 min-h-screen">
                <Navbar
                  mobileMenuActive={mobileMenuActive}
                  setMobileMenuActive={setMobileMenuActive}
                  userData={userData}
                  setShowUserMenu={setShowUserMenu}
                  showUserMenu={showUserMenu}
                  moreMenuActive={moreMenuActive}
                  setMoreMenuActive={setMoreMenuActive}
                  createTicketActive={createTicketActive}
                  setCreateTicketActive={setCreateTicketActive}
                  setIsLoggedIn={setIsLoggedIn}
                />
                <ProtectedRoute
                  element={TicketView}
                  userData={userData}
                  companyTeams={companyTeams}
                />
              </div>,
            ]}
          />
          <Route
            path="/user/:id"
            element={[
              <div key="UserView" className="">
                <Navbar
                  mobileMenuActive={mobileMenuActive}
                  setMobileMenuActive={setMobileMenuActive}
                  userData={userData}
                  setShowUserMenu={setShowUserMenu}
                  showUserMenu={showUserMenu}
                  moreMenuActive={moreMenuActive}
                  setMoreMenuActive={setMoreMenuActive}
                  createTicketActive={createTicketActive}
                  setCreateTicketActive={setCreateTicketActive}
                  setIsLoggedIn={setIsLoggedIn}
                />
                <ProtectedRoute
                  element={UserView}
                  userData={userData}
                  companyTeams={companyTeams}
                />
              </div>,
            ]}
          />
          <Route
            path="/AllTeams"
            element={[
              <div className="" key="teamsList">
                <Navbar
                  mobileMenuActive={mobileMenuActive}
                  setMobileMenuActive={setMobileMenuActive}
                  userData={userData}
                  setShowUserMenu={setShowUserMenu}
                  showUserMenu={showUserMenu}
                  moreMenuActive={moreMenuActive}
                  setMoreMenuActive={setMoreMenuActive}
                  createTicketActive={createTicketActive}
                  setCreateTicketActive={setCreateTicketActive}
                  setIsLoggedIn={setIsLoggedIn}
                />
                <ProtectedRoute
                  element={TeamsList}
                  userData={userData}
                  companyTeams={companyTeams}
                />
              </div>,
            ]}
          />
          <Route
            path="/team/:id"
            element={[
              <div key="teamView">
                <Navbar
                  mobileMenuActive={mobileMenuActive}
                  setMobileMenuActive={setMobileMenuActive}
                  userData={userData}
                  setShowUserMenu={setShowUserMenu}
                  showUserMenu={showUserMenu}
                  moreMenuActive={moreMenuActive}
                  setMoreMenuActive={setMoreMenuActive}
                  createTicketActive={createTicketActive}
                  setCreateTicketActive={setCreateTicketActive}
                  setIsLoggedIn={setIsLoggedIn}
                />
                <ProtectedRoute
                  element={TeamView}
                  userData={userData}
                  companyTeams={companyTeams}
                />
              </div>,
            ]}
          />
        </Routes>
        {createTicketActive ? (
          <div className="flex justify-center">
            <ProtectedRoute
              element={TicketCreation}
              userData={userData}
              companyTeams={companyTeams}
              createTicketActive={createTicketActive}
              setCreateTicketActive={setCreateTicketActive}
            />
          </div>
        ) : null}
        {mobileMenuActive ? (
          <ProtectedRoute
            element={MobileMenu}
            setCreateTicketActive={setCreateTicketActive}
            mobileMenuActive={mobileMenuActive}
            setMobileMenuActive={setMobileMenuActive}
          />
        ) : null}
        {mobileMenuActive ||
        showUserMenu ||
        moreMenuActive ||
        createTicketActive ||
        createUserActive ? (
          <div
            className="overlay1"
            onClick={() => {
              setMobileMenuActive(false);
              setShowUserMenu(false);
              setMoreMenuActive(false);
              setCreateTicketActive(false);
              setCreateUserActive(false);
            }}
          ></div>
        ) : null}
      </BrowserRouter>
    </main>
  );
}

export default App;
