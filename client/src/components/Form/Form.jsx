import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
    createActivity,
    updateActivity,
    getActivity,
} from "../../toolkit/activities";
import { getCountries } from "../../toolkit/countries";
import validate from "./validate";
import style from "./Form.module.css";

function Form() {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { countries } = useSelector((state) => state.countries);
    const { activities } = useSelector((state) => state.activities);
    const { id } = useParams();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const [activity, setActivity] = useState({
        name: "",
        difficulty: 1,
        duration: 1,
        season: "",
        countries: [],
    });

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivity());

        const initialErrors = validate(activity);
        setErrors(initialErrors);

        if (id) {
            const updatedActivity = activities.find(
                (activ) => activ.id === Number(id)
            );
            const countriesUpdatedActivity = updatedActivity.countries?.map(
                (country) => country.name
            );
            setActivity({
                name: updatedActivity.name,
                difficulty: updatedActivity.difficulty,
                duration: updatedActivity.duration,
                season: updatedActivity.season,
                countries: countriesUpdatedActivity,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const selectValue = event.target.value;

        const validateCountry = activity.countries.find(
            (country) => country === selectValue
        );

        if (!validateCountry) {
            const newActivity = {
                ...activity,
                countries: [...activity.countries, selectValue],
            };

            const newErrors = validate(newActivity);

            setActivity(newActivity);
            setErrors(newErrors);
        }
    };

    const handleDeleteCountry = (country) => {
        const searchCountry = activity.countries.filter(
            (countries) => country !== countries
        );
        setActivity({
            ...activity,
            countries: searchCountry,
        });
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
                dispatch(updateActivity(activity, id));
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

    const handleClear = () => {
        setActivity({
            name: "",
            difficulty: 1,
            duration: 1,
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
                </div>
                <p>Name of the activity:</p>
                <input
                    name="name"
                    type="text"
                    value={activity.name}
                    onChange={handleChange}
                    placeholder="Example: Trekking"
                />
                {errors.name && (
                    <p className={style.errorMessage}>{errors.name}</p>
                )}
                <p>Difficulty level: {activity.difficulty}</p>
                <input
                    name="difficulty"
                    type="range"
                    value={activity.difficulty}
                    onChange={handleChange}
                    min={1}
                    max={5}
                />
                {errors.difficulty && (
                    <p className={style.errorMessage}>{errors.difficulty}</p>
                )}
                <p>
                    Duration of the activity (max 12 hours): {activity.duration}{" "}
                    hours
                </p>
                <input
                    name="duration"
                    type="range"
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
                {errors.season && (
                    <p className={style.errorMessage}>{errors.season}</p>
                )}
                <p>Country(ies) of realization: </p>
                <p className={style.moreCountry}>
                    To select more than one country use CTRL + CLICK
                </p>
                <div className="select-wrapper">
                    <select
                        name="countries"
                        className={style.selectCountry}
                        onChange={handleChangeOptions}
                    >
                        <option value="" disabled defaultValue>
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
                <div className={style.renderCountriesContainer}>
                    {activity.countries &&
                        activity.countries?.map((country, index) => (
                            <div
                                key={index}
                                className={style.countriesSelected}
                            >
                                <p>{country}</p>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteCountry(country)}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                </div>
                <div className={style.buttonContainer}>
                    <button
                        type="submit"
                        className={
                            Object.keys(errors).length > 0
                                ? style.disabled
                                : style.button
                        }
                        disabled={Object.keys(errors).length > 0}
                    >
                        Submit
                    </button>
                    {pathname === "/create-activity" ? (
                        <button
                            type="button"
                            className={style.button}
                            onClick={handleClear}
                        >
                            Clear
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </form>
        </div>
    );
}

export default Form;
