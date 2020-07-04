import React from "react";
import { storiesOf } from "@storybook/react";
//import { action } from "@storybook/addon-actions";
import Search from ".";
import "./styles/search-styles.css";
import "./styles/suggest-styles.css";
import SearchInput from "./UI/SearchInput";
import ClearButton from "./UI/ClearButton";
import SubmitButton from "./UI/SubmitBytton";
import SuggestList from "./SuggestList";

storiesOf("Search", module).add("component", () => (
  <div className="container">
    <Search />
  </div>
));

storiesOf("SuggestionList", module).add("with query == 'kenzo'", () => (
  <div className="search-wrapper">
    <SuggestList
      query={"kenzo"}
      suggestions={[
        { searchterm: "kenzo trui", nrResults: 62 },
        { searchterm: "kenzo trui dames", nrResults: 21 },
        { searchterm: "kenzo trui heren", nrResults: 12 },
      ]}
      display={true}
    />
  </div>
));

storiesOf("SearchInput", module)
  .add("empty input", () => (
    <div className="search-wrapper">
      <SearchInput value="" />
    </div>
  ))
  .add("input with query", () => (
    <div className="search-wrapper">
      <SearchInput value="test" />
    </div>
  ));

storiesOf("SubmitButton", module).add("active", () => (
  <div className="container" style={{ margin: "5% 48%" }}>
    <SubmitButton disabled={false} />
  </div>
));

storiesOf("ClearButton", module).add("active", () => (
  <div className="container" style={{ margin: "5% 48%" }}>
    <ClearButton display={true} />
  </div>
));
