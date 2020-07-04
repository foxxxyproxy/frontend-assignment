import React, { useState, useEffect, useRef } from "react";
import SuggestList from "./SuggestList";
import "./styles/search-styles.css";
import { fetchFromApi, makeSuggest } from "./api-helper";
import SearchInput from "./UI/SearchInput";
import ClearButton from "./UI/ClearButton";
import SubmitButton from "./UI/SubmitBytton";

function Search(props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displaySuggest, setDisplaySuggest] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    async function getData() {
      //console.log("featching data...");
      setIsLoading(true);
      const res = await fetchFromApi(query);
      res
        .json()
        .then((res) => {
          const suggestionsList = makeSuggest(query, res);
          //console.log(suggestionsList);
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

  function handleItemClick(value) {
    setQuery(value);
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
