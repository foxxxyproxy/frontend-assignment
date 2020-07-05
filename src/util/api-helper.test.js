import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import { makeSuggest } from "./api-helper";
import fakeApiResponse from "./fakeApiResponse";

configure({ adapter: new Adapter() });

function returnSuccessResponse() {
  const response = fakeApiResponse;
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

  it("when query=='novalue' suggest list contains 0 items", async () => {
    const query = "novalue";
    const res = await returnSuccessResponse();
    const suggestList = makeSuggest(query, res);

    expect(suggestList.length).toEqual(0);
  });
});
