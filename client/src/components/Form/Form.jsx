import React, { useState, useEffect } from "react";
import { createActivity, getCountries, getActivity } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

function Form() {
  const { countries } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [activity, setActivity] = useState({
    name: "",
    difficulty: 0,
    duration: 0,
    season: "",
  });
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivity((activity) => ({
      ...activity,
      [name]: value,
    }));
  };

  const handleChangeOptions = (event) => {
    const { options } = event.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedCountries(selectedValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newActivity = { ...activity, countries: selectedCountries };
    dispatch(createActivity(newActivity));
    dispatch(getActivity());
    setActivity({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
    });
    setSelectedCountries([]);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <p>Nombre de la actividad:</p>
        <input
          name="name"
          type="text"
          value={activity.name}
          onChange={handleChange}
          placeholder="Ejm: Alpinismo"
        />
        <p>Nivel de dificultad:</p>
        <input
          name="difficulty"
          type="number"
          value={activity.difficulty}
          onChange={handleChange}
        />
        <p>Duración de la actividad: </p>
        <input
          name="duration"
          type="number"
          value={activity.duration}
          onChange={handleChange}
        />
        <p>Temporada para realizar la actividad: </p>
        <select name="season" value={activity.season} onChange={handleChange}>
          <option value="" disabled defaultValue>
            Season
          </option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
          <option value="Winter">Winter</option>
        </select>
        <p>País(es) en donde se realiza la actividad:</p>
        <div className="select-wrapper">
          <select
            name="countries"
            value={selectedCountries}
            onChange={handleChangeOptions}
            multiple
          >
            <option value="" disabled defaultValue>
              Country
            </option>
            {countries?.map((country, index) => (
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
