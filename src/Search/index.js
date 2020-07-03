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
        <label className="visually-hidden" htmlFor="search-form__input">
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
          <button
            aria-label="annuleren"
            className="search-form__button search-form__button--clear"
          />
          <button
            type="submit"
            aria-label="zoeken"
            className="search-form__button search-form__button--search"
          >
            <SearchIcon />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
