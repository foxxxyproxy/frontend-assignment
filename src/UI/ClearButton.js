import React from "react";

function ClearButton({ onClick, disabled, display, className }) {
  return (
    <>
      {display && (
        <button
          aria-label="annuleren"
          className={
            className || "search-form__button search-form__button--clear"
          }
          onClick={onClick}
          disabled={disabled}
          data-testid="clear"
        />
      )}
    </>
  );
}

export default ClearButton;
