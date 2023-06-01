import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, previousPage, currentPage } from "../../redux/actions";
import style from "./Pagination.module.css";

function Pagination({ numberPages }) {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state);

  let paginationButon = [];
  for (let i = 1; i <= numberPages; i++) {
    paginationButon.push(i);
  }

  const next = () => {
    if (page !== numberPages) {
      dispatch(nextPage());
    }
  };
  const previous = () => {
    if (page !== 1) {
      dispatch(previousPage());
    }
  };
  const current = (event) => {
    const { value } = event.target;
    dispatch(currentPage(value));
  };

  return (
    <div className={style.pagination}>
      <button className={page === 1 ? style.display : ""} onClick={previous}>
        Previous
      </button>
      {paginationButon.map((numberButton, index) => (
        <button
          key={index}
          onClick={current}
          value={numberButton}
          className={page === numberButton ? style.activeButton : ""}
        >
          {numberButton}
        </button>
      ))}
      <button
        className={page === numberPages ? style.display : ""}
        onClick={next}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
