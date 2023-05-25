import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [country, setCountry] = useState({});

  useEffect(() => {
    const detailCountry = async () => {
      const url = `http://localhost:3001/countries/${id}`;
      try {
        const { data } = await axios.get(url);
        setCountry(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    detailCountry();
  }, [id]);

  return (
    <div>
      <h1>Country: {country.name}</h1>
    </div>
  );
}

export default Detail;
