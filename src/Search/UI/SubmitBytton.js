import React from "react";
import SearchIcon from "./SearchIcon";

const SubmitButton = ({ disabled }) => (
  <button
    type="submit"
    aria-label="zoeken"
    className="search-form__button search-form__button--search"
    disabled={disabled}
  >
    <SearchIcon />
  </button>
);

export default SubmitButton;
