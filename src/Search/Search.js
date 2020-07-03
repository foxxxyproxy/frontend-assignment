import React, { useState } from "react";
import SearchIcon from "./SearchIcon";
import "./search-styles.css";

function Search(props) {
  const [query, setQuery] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();
  }
  function handleInputChange(e) {
    setQuery(e.target.value);
  }
  function handleClearClick() {
    setQuery("");
  }
  return (
    <div className="search-wrapper">
      <form
        className="search-form"
        role="search"
        onSubmit={handleFormSubmit}
        tabIndex={0}
      >
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
          value={query}
          onChange={handleInputChange}
        />

        <div className="button-wrapper">
          <button
            aria-label="annuleren"
            className="search-form__button search-form__button--clear"
            onClick={handleClearClick}
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
