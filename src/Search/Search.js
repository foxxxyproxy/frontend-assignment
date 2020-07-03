import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "./SearchIcon";
import SuggestList from "./SuggestList";
import "./search-styles.css";
import { fetchFromApi } from "./data-helper";

function Search(props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displaySuggest, setDisplaySuggest] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    async function getData() {
      console.log("featching data...");
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
          setDisplaySuggest(true);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (query.length > 2) {
      getData();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  function handleClickOutside(e) {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplaySuggest(false);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setQuery("");
    setSuggestions([]);
  }
  function handleInputChange(e) {
    setQuery(e.target.value);
  }
  function handleClearClick() {
    setQuery("");
    setSuggestions([]);
  }
  function handleOnKeyUpPress() {
    setDisplaySuggest(true);
  }
  return (
    <div className="container">
      <div ref={wrapperRef} className="search-wrapper" tabIndex={0}>
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
            value={query}
            required
            onChange={handleInputChange}
            onKeyUp={handleOnKeyUpPress}
          />

          <div className="button-wrapper">
            {query && (
              <button
                aria-label="annuleren"
                className="search-form__button search-form__button--clear"
                onClick={handleClearClick}
                disabled={isLoading}
              />
            )}
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
        {displaySuggest && (
          <SuggestList query={query} suggestions={suggestions} />
        )}
      </div>
    </div>
  );
}

export default Search;
