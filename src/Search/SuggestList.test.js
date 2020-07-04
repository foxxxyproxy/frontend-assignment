import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import SuggestList from "./SuggestList";

configure({ adapter: new Adapter() });

describe("<SuggestList />", () => {
  it("when query=='kenzo' suggest list contains 3 items", async () => {
    const query = "kenzo";

    const suggestions = [
      { searchterm: "kenzo trui", nrResults: 62 },
      { searchterm: "kenzo trui dames", nrResults: 21 },
      { searchterm: "kenzo trui heren", nrResults: 12 },
    ];
    const suggestComponent = mount(
      <SuggestList
        query={query}
        suggestions={suggestions}
        onItemClick={jest.fn}
        display={true}
      />
    );

    expect(suggestComponent.find(".search-suggestions")).toBeDefined();
    expect(suggestComponent.find(".search-suggestions li").length).toEqual(3);
  });
});
