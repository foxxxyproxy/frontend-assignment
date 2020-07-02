import React from "react";
import SearchIcon from "./SearchIcon";
import "./search-styles.css";

function Search(props) {
  function handleFormSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="search-wrapper">
      <form className="search-form" role="search" onSubmit={handleFormSubmit}>
        <label
          className="search-form__label visually-hidden"
          htmlFor="search-form__input"
        >
          Search
        </label>
        <input
          className="search-form__input"
          id="search-form__input"
          name="search-form__input"
          type="search"
          autoFocus
          placeholder="Zoeken"
        />

        <div className="button-wrapper">
          <button className="search-form__clear-button"></button>
          <SearchIcon />
          <button type="submit" className="search-form__submit visually-hidden">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
