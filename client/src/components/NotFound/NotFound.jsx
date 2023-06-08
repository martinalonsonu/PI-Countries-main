import React from "react";
import style from "./NotFound.module.css";
import image from "../../images/mundo.png";

function NotFound() {
  return (
    <div className={style.principal}>
      <div className={style.resultContainer}>
        <img src={image} alt="world" />
        <div className={style.textContainer}>
          <h2>Oops! 404 Not Found</h2>
          <p>The requested page is not available or does not exist.</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
