import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, configure } from "enzyme";
import Search from "./Search";
//import SuggestList from "./SuggestList";

configure({ adapter: new Adapter() });

describe("<Search />", () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);

  /* const flushPromises = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
  }; */

  beforeEach(() => {
    wrapper = shallow(<Search />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("the form is displayed correctly", () => {
    it("when form input exist and empty - clear button doesn't exist", () => {
      expect(wrapper.find(".search-form__input").props().value).toBe("");
      expect(
        wrapper.find(".search-form__button--clear").props().display
      ).toEqual(false);
    });

    it("should have a submit button", () => {
      expect(wrapper.find(".search-form__button--search").length).toEqual(1);
    });

    it("form input change works", () => {
      const query = "test";
      wrapper.find(".search-form__input").simulate("change", {
        target: {
          value: query,
        },
      });
      expect(wrapper.find(".search-form__input").prop("value")).toEqual("test");
    });

    it("after form input change - clear button exist", async () => {
      const query = "test";
      wrapper.find(".search-form__input").simulate("change", {
        target: {
          value: query,
        },
      });
      expect(wrapper.find(".search-form__input").prop("value")).toEqual("test");
      expect(
        wrapper.find(".search-form__button--clear").props().display
      ).toEqual(true);
    });

    it("on clear-button click - input is empty", async () => {
      const query = "test";
      wrapper.find(".search-form__input").simulate("change", {
        target: {
          value: query,
        },
      });
      expect(wrapper.find(".search-form__input").prop("value")).toEqual("test");

      wrapper.find(".search-form__button--clear").props().onClick();
      expect(wrapper.find(".search-form__input").prop("value")).toEqual("");
    });
  });

  /*   describe("<SuggestList />", () => {
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
  }); */
});
