import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActivity, deleteActivity } from "../../toolkit/activities";
import { loadingStatus } from "../../toolkit/others";
import { Link } from "react-router-dom";
import style from "./Activity.module.css";
import Loading from "../Loading/Loading";

function Activity() {
    const { activities } = useSelector((state) => state.activities);
    const { loading } = useSelector((state) => state.others);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadingStatus(true));
        dispatch(getActivity());
        setTimeout(() => dispatch(loadingStatus(false)), 1000);
    }, [dispatch]);

    const handleDelete = (id) => {
        const trueDelete = window.confirm(
            "Are you sure you want to delete the activity?"
        );
        trueDelete && dispatch(deleteActivity(id));
    };

    return loading ? (
        <Loading />
    ) : (
        <div className={style.container}>
            <div className={`${style.title} title`}>
                <h2>Activity List</h2>
                <Link className={style.link} to="/create-activity">
                    <button className={style.create}>+</button>
                </Link>
            </div>
            <table className={style.tableInfo}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Difficulty (scale from 1 to 5)</th>
                        <th>Duration (in hours)</th>
                        <th>Season</th>
                        <th>Countries of practice</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {activities &&
                        activities?.map((activ, index) => (
                            <tr key={index}>
                                <td>{activ.name}</td>
                                <td>{activ.difficulty}</td>
                                <td>{activ.duration} hours</td>
                                <td>{activ.season}</td>
                                <td>
                                    {activ.countries?.map((country, index) => (
                                        <p key={index}> - {country?.name}</p>
                                    ))}
                                </td>
                                <td>
                                    <Link to={`/update-activity/${activ.id}`}>
                                        <button className={style.update}>
                                            Update
                                        </button>
                                    </Link>
                                    <button
                                        className={style.delete}
                                        onClick={() => handleDelete(activ.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Activity;
