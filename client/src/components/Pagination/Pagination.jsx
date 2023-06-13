import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    nextPageBtn,
    previousPageBtn,
    currentPageBtn,
} from "../../toolkit/others";
import style from "./Pagination.module.css";

function Pagination({ numberPages }) {
    const dispatch = useDispatch();
    const { page } = useSelector((state) => state.others);

    let paginationButon = [];
    for (let i = 1; i <= numberPages; i++) {
        paginationButon.push(i);
    }

    const next = () => {
        if (page !== numberPages) {
            dispatch(nextPageBtn());
        }
    };
    const previous = () => {
        if (page !== 1) {
            dispatch(previousPageBtn());
        }
    };
    const current = (event) => {
        const { value } = event.target;
        dispatch(currentPageBtn(value));
    };

    return (
        <div className={style.pagination}>
            <button
                className={page === 1 ? style.display : ""}
                onClick={previous}
            >
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
