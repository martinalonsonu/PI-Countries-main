import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../toolkit/countries";
import { currentPageBtn } from "../../toolkit/others";
import style from "./SearchBar.module.css";

function SearchBar() {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { value } = event.target;
        setName(value);
        dispatch(getCountriesByName(value));
        dispatch(currentPageBtn(1));
    };

    return (
        <div className={style.container}>
            <input
                type="text"
                value={name}
                onChange={handleChange}
                placeholder="Busca tu país..."
            />
        </div>
    );
}

export default SearchBar;
