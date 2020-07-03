import React, { useState, useEffect } from "react";
import SearchIcon from "./SearchIcon";
import "./search-styles.css";
import { fetchFromApi } from "./data-helper";

function Search(props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      //console.log("featching data...");
      setIsLoading(true);
      const res = await fetchFromApi(query);
      res
        .json()
        .then((res) => {
          //console.log(res);
          const regex = RegExp(query, "i");
          const suggestionsList = res.suggestions.filter(({ searchterm }) =>
            regex.test(searchterm)
          );
          console.log(suggestionsList);
          setSuggestions(suggestionsList);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (query.length > 2) {
      getData();
    }
  }, [query]);

  function handleFormSubmit(e) {
    e.preventDefault();
  }
  function handleInputChange(e) {
    setQuery(e.target.value);
  }
  function handleClearClick() {
    setQuery("");
  }
  function handleOnKeyUpPress() {}
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
          required
          onChange={handleInputChange}
          onKeyUp={handleOnKeyUpPress}
        />

        <div className="button-wrapper">
          <button
            aria-label="annuleren"
            className="search-form__button search-form__button--clear"
            onClick={handleClearClick}
            disabled={isLoading}
          />
          <button
            type="submit"
            aria-label="zoeken"
            className="search-form__button search-form__button--search"
            disabled={isLoading}
          >
            <SearchIcon />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
