import React from "react";

const SearchInput = ({ onChange, onKeyUp, value }) => (
  <>
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
      value={value}
      required
      onChange={onChange}
      onKeyUp={onKeyUp}
      autoComplete="off"
    />
  </>
);

export default SearchInput;
