import React, { useState, useEffect } from "react";
import {
  createActivity,
  getCountries,
  getActivity,
  updateActivity,
} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./Form.module.css";

function Form() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { countries, activities } = useSelector((state) => state);
  const { id } = useParams();

  const [activity, setActivity] = useState({
    name: "",
    difficulty: 0,
    duration: 0,
    season: "",
    countries: [],
  });

  useEffect(() => {
    dispatch(getActivity());
    dispatch(getCountries());

    const updatedActivity = activities.find((activ) => activ.id === Number(id));
    updatedActivity
      ? setActivity(updatedActivity)
      : setActivity({
          name: "",
          difficulty: 0,
          duration: 0,
          season: "",
          countries: [],
        });
  }, [dispatch, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivity((activity) => ({
      ...activity,
      [name]: value,
    }));
  };

  const handleChangeOptions = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    console.log(selectedValues);
    setActivity((activity) => ({
      ...activity,
      countries: selectedValues,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      dispatch(updateActivity(activity));
      alert("The activity was successfully updated");
    } else {
      dispatch(createActivity(activity));
      alert("The activity was created successfully");
    }
    setActivity({
      name: "",
      difficulty: 0,
      duration: 0,
      season: "",
      countries: [],
    });
  };

  return (
    <div className={style.container}>
      <form className={style.form} action="" onSubmit={handleSubmit}>
        <div className={style.title}>
          {pathname === "/create-activity" ? (
            <h1>Create Activity</h1>
          ) : (
            <h1>Edit Activity</h1>
          )}
          <Link to="/activities">
            <button className={style.returnButton}>Return</button>
          </Link>
        </div>
        <p>Name of the activity:</p>
        <input
          name="name"
          type="text"
          value={activity.name}
          onChange={handleChange}
          placeholder="Example: Trekking"
        />
        <p>Difficulty level:</p>
        <input
          name="difficulty"
          type="number"
          value={activity.difficulty}
          onChange={handleChange}
        />
        <p>Duration of the activity (in hours): </p>
        <input
          name="duration"
          type="number"
          value={activity.duration}
          onChange={handleChange}
        />
        <p>Realization season: </p>
        <select
          className={style.selectSeason}
          name="season"
          value={activity.season}
          onChange={handleChange}
        >
          <option value="" disabled defaultValue>
            Season
          </option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
          <option value="Winter">Winter</option>
        </select>
        <p>Country(ies) of realization: </p>
        <p className={style.moreCountry}>
          To select more than one country use CTRL + CLICK
        </p>
        <div className="select-wrapper">
          <select
            name="countries"
            value={activity.countries}
            onChange={handleChangeOptions}
            multiple
          >
            <option
              className={style.selectCountry}
              value=""
              disabled
              defaultValue
            >
              Country
            </option>
            {countries &&
              countries?.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
          </select>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Form;
