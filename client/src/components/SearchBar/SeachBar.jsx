import React, { useState } from "react";

function SeachBar({ searchCountries }) {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setName(value);
    searchCountries(value);
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
