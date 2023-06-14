import React from "react";
import style from "./Card.module.css";
import image from "../../images/tag.png";

function Card({ name, flag, continent, activities }) {
    return (
        <div className={style.card}>
            <div className={style.imgContainer}>
                <img src={flag} alt={name} className={style.image} />
            </div>
            <div className={style.textContainer}>
                <h3>{name}</h3>
                <p>Continent: {continent}</p>
                {activities?.length > 0 && (
                    <div className={style.tagContainer}>
                        <img src={image} alt="tag" className={style.tag} />
                        ActivityTag:{" "}
                        {activities &&
                            activities?.map((activity, index) => (
                                <span key={index}>
                                    {activity.name}
                                    {index !== activities.length - 1 && ", "}
                                </span>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card;
