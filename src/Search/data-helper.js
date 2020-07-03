const baseURI = "http://localhost:5000";

export function fetchFromApi(query) {
  const res = fetch(`${baseURI}/search?q=${encodeURI(query)}`);

  return res;
}
