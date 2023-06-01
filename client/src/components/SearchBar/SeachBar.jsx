import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName, currentPage } from "../../redux/actions";
import style from "./SearchBar.module.css";

function SeachBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value } = event.target;
    setName(value);
    dispatch(getCountriesByName(value));
    dispatch(currentPage(1));
  };

  return (
    <div className={style.container}>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Busca tu país..."
      />
    </div>
  );
}

export default SeachBar;
