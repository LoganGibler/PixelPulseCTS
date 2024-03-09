import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { searchTickets } from "../api/tickets";
import { useNavigate } from "react-router";

const Searchbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchInput = async (search) => {
    setSearch(search);
    await runSearch(search);
  };

  const runSearch = async (search) => {
    const searchResult = await searchTickets(search);
    // console.log(searchResult);
    setSearchResult(searchResult);
  };

  const handleFocus = () => {
    setActiveSearch(true);
  };

  const handleBlur = () => {
    setActiveSearch(false);
  };

  return (
    <form className="flex flex-col rounded-sm bg-slate-700">
      <div className="flex">
        <IoSearchSharp className="bg-slate-700 text-2xl mt-[0px] mr-1.5 hidden sm:flex" />
        <input
          type="text"
          placeholder="Search tickets here..."
          className="rounded-md w-[150px] md:w-[250px] px-2 text-white text-sm bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          onChange={(e) => {
            handleSearchInput(e.target.value);
            // console.log("Search: ", search);
          }}
          onFocus={handleFocus}
          // onBlur={handleBlur}
        ></input>
      </div>
      {activeSearch && search ? (
        <div className="absolute right-1 top-[87px] sm:top-[99px] bg-slate-700 w-[280px] max-h-[350px] sm:w-[380px] rounded-br-md rounded-bl-md sm:max-h-[500px] overflow-y-scroll">
          {searchResult.length
            ? searchResult.map((ticket, index) => {
                return (
                  <div
                    key={index}
                    className="flex px-2 text-sm hover:cursor-pointer py-3 border-b-[1px]"
                    onClick={() => {
                      navigate("/ticket/" + ticket.ticketNumber);
                    }}
                  >
                    <p className="pr-2">#{ticket.ticketNumber}</p>
                    <p className="truncated-text-sm">{ticket.title}</p>
                  </div>
                );
              })
            : null}
        </div>
      ) : null}
    </form>
  );
};

export default Searchbar;
