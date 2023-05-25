import React, { useState } from "react";
import Card from "../Card/Card";

function Home({ countries }) {
  const [page, setPage] = useState(0);
  const pagSize = 10;
  const countriesSlice = countries.slice(page, page + pagSize);

  const btnNext = () => {
    if (page + pagSize < countries.length) setPage(page + pagSize);
  };
  const btnPrevious = () => {
    if (page > 0) setPage(page - pagSize);
  };

  return (
    <div>
      {countriesSlice.map(
        ({
          id,
          name,
          flag,
          continent,
          capital,
          subregion,
          area,
          population,
          activities,
        }) => (
          <div key={id}>
            <Card
              id={id}
              name={name}
              flag={flag}
              continent={continent}
              capital={capital}
              subregion={subregion}
              area={area}
              population={population}
              activities={activities}
            />
          </div>
        )
      )}
      <button onClick={btnPrevious}>Anterior</button>
      <button onClick={btnNext}>Siguiente</button>
    </div>
  );
}

export default Home;
