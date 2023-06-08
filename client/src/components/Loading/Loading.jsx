import React from "react";
import style from "./Loading.module.css";
import image from "../../images/mundo.png";

function Loading() {
  return (
    <div className={style.container}>
      <img className={style.imageWorld} src={image} alt="imageWorld" />
      <h3>Loading...</h3>
    </div>
  );
}

export default Loading;
