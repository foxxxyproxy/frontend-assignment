import React from "react";

function ClearButton({ onClick, disabled, display }) {
  return (
    <>
      {display && (
        <button
          aria-label="annuleren"
          className="search-form__button search-form__button--clear"
          onClick={onClick}
          disabled={disabled}
          data-testid="clear"
        />
      )}
    </>
  );
}

export default ClearButton;
