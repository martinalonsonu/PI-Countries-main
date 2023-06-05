import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActivity, deleteActivity } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from "./Activity.module.css";

function Activity() {
  const { activities } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  const handleDelete = (id) => {
    const trueDelete = window.confirm(
      "¿Está seguro que desea borrar la actividad?"
    );
    trueDelete && dispatch(deleteActivity(id));
  };

  return (
    <div className={style.container}>
      <h2>Activity List</h2>
      <Link to={"/create-activity"}>OYE</Link>
      <table className={style.tableInfo}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Duration</th>
            <th>Season</th>
            <th>Countries</th>
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
                    <p key={index}> - {country.name}</p>
                  ))}
                </td>
                <td>
                  <button onClick={() => handleDelete(activ.id)}>Delete</button>
                  <Link to={`/update-activity/${activ.id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activity;
