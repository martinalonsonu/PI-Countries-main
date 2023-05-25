import React from "react";
import SearchBar from "../SearchBar/SeachBar";

function NavBar({ renderCountries }) {
  return (
    <div>
      <SearchBar renderCountries={renderCountries} />
    </div>
  );
}

export default NavBar;
