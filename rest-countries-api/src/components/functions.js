function findCountry(array, name, msg) {
  if (msg === "api") {
    return array.find((country) => country.name.common === name);
  } else if (msg === "local" || msg === null) {
    return array.find((country) => country.name === name);
  }
}
function findContinent(array, name) {
  return array.filter((country) => country.region === name);
}
export { findCountry, findContinent };
