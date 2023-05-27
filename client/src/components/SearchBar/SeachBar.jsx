import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions";

function SeachBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value } = event.target;
    setName(value);
    dispatch(getCountriesByName(value));
  };

  return (
    <div>
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
