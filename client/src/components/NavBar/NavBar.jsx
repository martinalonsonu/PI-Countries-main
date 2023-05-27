import React from "react";
import SearchBar from "../SearchBar/SeachBar";
import { useLocation } from "react-router-dom";

function NavBar() {
  const { pathname } = useLocation();
  return <div>{pathname === "/home" && <SearchBar />}</div>;
}

export default NavBar;
