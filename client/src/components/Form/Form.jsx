import React, { useState, useEffect } from "react";
import {
  createActivity,
  getCountries,
  getActivity,
  updateActivity,
} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import style from "./Form.module.css";

function Form() {
  const dispatch = useDispatch();
  const { countries, activities } = useSelector((state) => state);
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState({
    name: "",
    difficulty: 0,
    duration: 0,
    season: "",
  });
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivity());

    const updatedActivity = activities.find((activ) => activ.id === Number(id));
    updatedActivity
      ? setActivity(updatedActivity)
      : setActivity({
          name: "",
          difficulty: 0,
          duration: 0,
          season: "",
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
    setSelectedCountries(selectedValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      const updatedActivity = { ...activity, countries: selectedCountries };
      dispatch(updateActivity(id, updatedActivity));
      dispatch(getActivity());
    } else {
      const newActivity = { ...activity, countries: selectedCountries };
      dispatch(createActivity(newActivity));
      dispatch(getActivity());
    }
    navigate("/activities");
  };

  return (
    <div className={style.container}>
      <form className={style.form} action="" onSubmit={handleSubmit}>
        <h1>Create Activity</h1>
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
            value={selectedCountries}
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
