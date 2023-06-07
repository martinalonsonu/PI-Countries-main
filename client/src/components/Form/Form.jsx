import React, { useState, useEffect } from "react";
import {
  createActivity,
  getCountries,
  getActivity,
  updateActivity,
} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import validate from "./validate";
import style from "./Form.module.css";

function Form() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { countries, activities } = useSelector((state) => state);
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [activity, setActivity] = useState({
    name: "",
    difficulty: 1,
    duration: 0,
    season: "",
    countries: [],
  });

  useEffect(() => {
    dispatch(getActivity());
    dispatch(getCountries());

    const updatedActivity = activities.find((activ) => activ.id === Number(id));
    setActivity(
      updatedActivity || {
        name: "",
        difficulty: 1,
        duration: 0,
        season: "",
        countries: [],
      }
    );
  }, [dispatch, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newActivity = {
      ...activity,
      [name]: value,
    };
    const newErrors = validate(newActivity);

    setActivity(newActivity);
    setErrors(newErrors);
  };

  const handleChangeOptions = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    const newActivity = {
      ...activity,
      countries: selectedValues,
    };
    const newErrors = validate(newActivity);

    setActivity(newActivity);
    setErrors(newErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !errors.name &&
      !errors.difficulty &&
      !errors.duration &&
      !errors.season &&
      !errors.countries
    ) {
      if (id) {
        dispatch(updateActivity(activity));
        alert("The activity was successfully updated");
        navigate(-1);
      } else {
        const activitySearch = activities.find(
          (activityState) => activityState.name === activity.name
        );
        if (!activitySearch) {
          dispatch(createActivity(activity));
          alert("The activity was created successfully");
          navigate(-1);
        } else {
          alert(
            "There is already an activity registered with this name, please try another one."
          );
        }
      }
    }
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
        </div>
        <p>Name of the activity:</p>
        <input
          name="name"
          type="text"
          value={activity.name}
          onChange={handleChange}
          placeholder="Example: Trekking"
        />
        {errors.name && <p className={style.errorMessage}>{errors.name}</p>}
        <p>Difficulty level:</p>
        <input
          name="difficulty"
          type="number"
          value={activity.difficulty}
          onChange={handleChange}
          min={1}
          max={5}
        />
        {errors.difficulty && (
          <p className={style.errorMessage}>{errors.difficulty}</p>
        )}
        <p>Duration of the activity (in hours): </p>
        <input
          name="duration"
          type="number"
          value={activity.duration}
          onChange={handleChange}
          min={1}
          max={12}
        />
        {errors.duration && (
          <p className={style.errorMessage}>{errors.duration}</p>
        )}
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
        {errors.season && <p className={style.errorMessage}>{errors.season}</p>}
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
          {errors.countries && (
            <p className={style.errorMessage}>{errors.countries}</p>
          )}
        </div>
        <button
          className={
            Object.keys(errors).length > 0 ? style.disabled : style.button
          }
          disabled={Object.keys(errors).length > 0}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
