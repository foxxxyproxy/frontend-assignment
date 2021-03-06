import React, { useState, useEffect, useRef, useCallback } from "react";
import SuggestList from "./SuggestList";
import "../styles/search-styles.css";
import fakeApiResponse from "../util/fake-api-response";
import { fetchFromApi, makeSuggest } from "../util/api-helper";
import SearchInput from "../UI/SearchInput";
import ClearButton from "../UI/ClearButton";
import SubmitButton from "../UI/SubmitBytton";
import debounce from "lodash/debounce";

function Search(props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displaySuggest, setDisplaySuggest] = useState(false);
  const wrapperRef = useRef(null);
  const delayedQuery = useCallback(debounce(updateQuery, 500), [query]);

  useEffect(() => {
    if (query.length > 2) {
      delayedQuery();
      //cancel the debounce on useEffect cleanup
      return delayedQuery.cancel;
    } else {
      setSuggestions([]);
    }
  }, [query, delayedQuery]);

  async function updateQuery() {
    //console.log("getting query for ", query);
    setIsLoading(true);
    try {
      const res = await fetchFromApi(query);
      res
        .json()
        .then((res) => {
          const suggestionsList = makeSuggest(query, res);
          setSuggestions(suggestionsList);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    } catch (e) {
      //for temporary reasons. if fake API is not launched
      console.log("api is not launched suggest from fake response");
      const suggestionsList = makeSuggest(query, fakeApiResponse);
      setSuggestions(suggestionsList);
      setIsLoading(false);
    }
  }

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

  function handleItemClick(value) {
    setQuery(value);
    setDisplaySuggest((prev) => !prev);
  }

  return (
    <div className="container">
      <div ref={wrapperRef} className="search-wrapper" tabIndex={0}>
        <form className="search-form" role="search" onSubmit={handleFormSubmit}>
          <SearchInput
            className="search-form__input"
            onChange={handleInputChange}
            onKeyUp={handleOnKeyUpPress}
            value={query}
          />
          <div className="button-wrapper">
            <ClearButton
              className="search-form__button search-form__button--clear"
              onClick={handleClearClick}
              disabled={isLoading}
              display={query.length > 0}
            />
            <SubmitButton
              className="search-form__button search-form__button--search"
              disabled={isLoading}
            />
          </div>
        </form>

        <SuggestList
          className="search-suggestions"
          query={query}
          suggestions={suggestions}
          onItemClick={handleItemClick}
          display={displaySuggest}
        />
      </div>
    </div>
  );
}

export default Search;
