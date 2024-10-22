import Card from "./Card";
function CountryList({ countries }) {
  return (
    <ul>
      {countries.map((country) => (
        <Card key={country.name} data={country} />
      ))}
    </ul>
  );
}

export default CountryList;
