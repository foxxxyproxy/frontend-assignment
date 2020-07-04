import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import { makeSuggest } from "./api-helper";

configure({ adapter: new Adapter() });

function returnSuccessResponse() {
  const response = {
    suggestions: [
      {
        searchterm: "heren truien",
        nrResults: 1100,
      },
      {
        searchterm: "dames truien",
        nrResults: 1501,
      },
      {
        searchterm: "kenzo trui",
        nrResults: 62,
      },
      {
        searchterm: "kenzo trui dames",
        nrResults: 21,
      },
      {
        searchterm: "kenzo trui heren",
        nrResults: 12,
      },
      {
        searchterm: "armani truien",
        nrResults: 39,
      },
      {
        searchterm: "daily paper trui",
        nrResults: 2,
      },
      {
        searchterm: "calvin klein trui",
        nrResults: 54,
      },
      {
        searchterm: "calvin klein trui heren rood",
        nrResults: 40,
      },
      {
        searchterm: "calvin klein trui heren blauw",
        nrResults: 50,
      },
      {
        searchterm: "calvin klein trui heren oranje",
        nrResults: 42,
      },
    ],
  };

  return Promise.resolve(response);
}

describe("api-helper", () => {
  it("when query=='kenzo' suggest list contains 3 items", async () => {
    const query = "kenzo";
    const res = await returnSuccessResponse();

    const suggestList = makeSuggest(query, res);

    const suggestions = [
      { searchterm: "kenzo trui", nrResults: 62 },
      { searchterm: "kenzo trui dames", nrResults: 21 },
      { searchterm: "kenzo trui heren", nrResults: 12 },
    ];

    expect(suggestList.length).toEqual(suggestions.length);
    expect(suggestList[0].searchterm).toEqual(suggestions[0].searchterm);
  });
});
