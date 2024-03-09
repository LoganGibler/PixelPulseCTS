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
} from "./components";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { testSession } from "./auth/auth";
import { getCompanyTeams } from "./api/company";
import { HomeDashboard, TicketView } from "./containers";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [companyTeams, setCompanyTeams] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [moreMenuActive, setMoreMenuActive] = useState(false);

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
                className="flex grow justify-center bg-gradient h-screen"
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
                />
                <AllIncidents userData={userData} />
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
                />
                <AllChanges userData={userData} />
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
                />
                <AllServiceRequests userData={userData} />
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
                />
                <div className="flex">
                  <HomeDashboard userData={userData} />
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
                />
                <UserList />
              </div>,
            ]}
          />
          <Route
            path="/createTicket"
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
                />
                <TicketCreation
                  userData={userData}
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
                />
                <TicketView userData={userData} companyTeams={companyTeams} />
              </div>,
            ]}
          />
        </Routes>
        {mobileMenuActive ? (
          <MobileMenu
            mobileMenuActive={mobileMenuActive}
            setMobileMenuActive={setMobileMenuActive}
          />
        ) : null}
        {mobileMenuActive || showUserMenu || moreMenuActive ? (
          <div
            className="overlay1"
            onClick={() => {
              setMobileMenuActive(false);
              setShowUserMenu(false);
              setMoreMenuActive(false);
            }}
          ></div>
        ) : null}
      </BrowserRouter>
    </main>
  );
}

export default App;
