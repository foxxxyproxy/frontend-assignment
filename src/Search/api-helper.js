const baseURI = "http://localhost:5000";

export function fetchFromApi(query) {
  const res = fetch(`${baseURI}/search?q=${encodeURI(query)}`);

  return res;
}

export function makeSuggest(query, res) {
  const regex = RegExp(query, "i");
  const suggestionsList = res.suggestions.filter(({ searchterm }) =>
    regex.test(searchterm)
  );
  return suggestionsList;
}
