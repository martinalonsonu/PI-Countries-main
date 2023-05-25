import React, { useState } from "react";

function SeachBar({ renderCountries }) {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const clickButton = () => {
    if (!name) {
      alert("¡No hay datos para realizar la búsqueda!");
    } else {
      renderCountries(name);
      setName("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      renderCountries(name);
      setName("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={clickButton} className="search-button">
        Buscar
      </button>
    </div>
  );
}

export default SeachBar;
