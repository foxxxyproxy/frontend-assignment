import React from "react";
import SearchIcon from "./SearchIcon";

const SubmitButton = ({ disabled, className }) => (
  <button
    type="submit"
    aria-label="zoeken"
    className={className || "search-form__button search-form__button--search"}
    disabled={disabled}
  >
    <SearchIcon />
  </button>
);

export default SubmitButton;
