import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <h1>LANDING PAGE</h1>
      <Link to="/home">
        <button>INICIAR</button>
      </Link>
    </div>
  );
}

export default Landing;
