import React from "react";
import SearchBar from "../SearchBar/SeachBar";
import { useLocation } from "react-router-dom";

function NavBar({ searchCountries }) {
  const { pathname } = useLocation();
  return (
    <div>
      {pathname === "/home" && <SearchBar searchCountries={searchCountries} />}
    </div>
  );
}

export default NavBar;
