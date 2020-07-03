import React, { useState, useEffect } from "react";
import "./suggest-styles.css";

function SuggestList(props) {
  const { query, suggestions, onItemClick } = props;
  return (
    <>
      {suggestions.length > 0 && (
        <ul className="search-suggestions">
          {suggestions.map((suggest, index) => (
            <li
              key={index}
              className="search-suggestions__item"
              tabIndex={0}
              onClick={onItemClick}
            >
              <span className="search-suggestions__item--term">
                {suggest.searchterm}
              </span>
              <span>{` (${suggest.nrResults})`}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default SuggestList;
