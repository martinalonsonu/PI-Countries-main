import React from "react";
import { useDispatch } from "react-redux";
import { nextPage, previousPage, currentPage } from "../../redux/actions";
import style from "./Pagination.module.css";

function Pagination({ numPages }) {
  const dispatch = useDispatch();

  let paginationButon = [];
  for (let i = 1; i <= numPages; i++) {
    paginationButon.push(i);
  }

  const next = () => {
    dispatch(nextPage());
  };
  const previous = () => {
    dispatch(previousPage());
  };
  const current = (event) => {
    const { value } = event.target;
    dispatch(currentPage(value));
  };

  return (
    <div className={style.pagination}>
      <button onClick={previous}>Previous</button>
      {paginationButon.map((numberPage, index) => (
        <button key={index} onClick={current} value={numberPage}>
          {numberPage}
        </button>
      ))}
      <button onClick={next}>Next</button>
    </div>
  );
}

export default Pagination;
