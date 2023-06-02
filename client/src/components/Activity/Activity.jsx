import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActivity, deleteActivity } from "../../redux/actions";
import style from "./Activity.module.css";

function Activity() {
  const { activities } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);
  return (
    <div className={style.container}>
      <h1>Activity List</h1>
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
                <td>{activ.duration}</td>
                <td>{activ.season}</td>
                <td>
                  {activ.countries?.map((country, index) => (
                    <p key={index}>{country.name}</p>
                  ))}
                </td>
                <td>
                  <button onClick={() => dispatch(deleteActivity(activ.id))}>
                    Borrar
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
