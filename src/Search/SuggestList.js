import React, { useState, useEffect } from "react";
import "./suggest-styles.css";

function SuggestList(props) {
  const { query, suggestions, onItemClick } = props;

  function highlightQuery(string) {
    const parts = string.split(new RegExp(`(${query})`, "gi"));

    const newNode = parts.map((part, index) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return (
          <span key={index} className="search-suggestions__item--highlight">
            {part}
          </span>
        );
      }
      return part;
    });
    //console.log(newNode);
    return newNode;
  }

  return (
    <>
      {suggestions.length > 0 && (
        <ul className="search-suggestions">
          {suggestions.map((suggest, index) => (
            <li
              key={index}
              className="search-suggestions__item"
              tabIndex={0}
              onClick={() => onItemClick(suggest.searchterm)}
            >
              <span className="search-suggestions__item--term">
                {highlightQuery(suggest.searchterm)}
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
