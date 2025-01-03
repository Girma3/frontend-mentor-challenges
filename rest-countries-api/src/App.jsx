import { useEffect, useState } from "react";
import { ThemeProvider } from "./components/ThemeContext";
import useLocalStorageState from "./components/useLocalStorageState";
import useFetch from "./components/useFetch";
import Filter from "./components/Filter";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import Loading from "./components/Loading";
import InfiniteScroll from "react-infinite-scroller";
import Assemble from "./components/Assemble";
import { useNavigate, useNavigation } from "react-router-dom";
import { MdSportsGolf } from "react-icons/md";
import { findContinent } from "./components/functions";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [show, setShow] = useState(false);
  const [network, setNetwork] = useLocalStorageState(null, "network");
  const { data, error, isLoading } = useFetch("/data/data.json");
  const [countries, setCountries] = useLocalStorageState([], "countries");
  const [filteredCountries, setFilteredCountries] = useLocalStorageState(
    [],
    "filteredCountries"
  );
  const [selectedFilter, setSelectedFilter] = useLocalStorageState(
    null,
    "selectedFilter"
  );

  useEffect(() => {
    let continents = ["africa", "asia", "america", "oceania", "europe"];
    if (countries.length > 100) return;

    const controller = new AbortController();
    setLoading(() => true);
    function sortCountriesByName(countries) {
      if (countries.length === 0) return [];
      if (network === null) {
        const sortedCountries = countries.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(() => [...sortedCountries]);
        setFilteredCountries(() => [...sortedCountries]);
      }
    }

    async function allCountries(array) {
      try {
        const promises = array.map(async (region) => {
          const regionUrl = `https://restcountries.com/v3.1/region/${region}`;
          const request = await fetch(regionUrl, {
            signal: controller.signal,
          });
          const response = await request.json();
          return response;
        });

        const responses = await Promise.all(promises);
        const flattenedResponses = responses.flat(); // Flatten array of arrays
        setNetwork(() => "api");
        return sortCountriesByName(flattenedResponses);
      } catch (err) {
        if (err.name === "AbortError") {
          setMsg(() => null);
        } else {
          setMsg(() => "Fetch error, please refresh try again.");
        }
      }
    }

    allCountries(continents);
    setLoading(() => false);
    return () => controller.abort();
  }, [setCountries, setFilteredCountries, setNetwork, countries, network]);

  function handleQuery(e) {
    setSearchQuery((prev) => {
      if (prev !== e.target.value) {
        return e.target.value;
      }
    });
  }

  function handleFilter(e) {
    setSelectedFilter(() => e.target.textContent);
    setMsg(() => null);
    setSearchQuery(() => "");
  }
  useEffect(
    function () {
      if (selectedFilter === null || countries.length < 10) return;
      setLoading(() => true);
      function filterContinent() {
        return countries.filter((country) =>
          country.region.includes(selectedFilter)
        );
      }
      let filteredContinents = filterContinent();
      if (filteredContinents.length === 0) {
        setMsg(() => "Please refresh and try again.");
      } else {
        setFilteredCountries(() => [...filteredContinents]);
      }
      setLoading(() => false);
    },
    [countries, selectedFilter, setFilteredCountries]
  );

  useEffect(() => {
    function findCountry() {
      return countries.filter((country) => {
        let commonName = country.name.common
          ? country.name.common.toLowerCase()
          : country.name.toLowerCase();

        let query = searchQuery.toLowerCase();
        return commonName.includes(query);
      });
    }

    if (searchQuery === null || searchQuery === undefined || searchQuery === "")
      return;
    let country = findCountry(searchQuery);
    setLoading(() => true);

    if (country.length !== 0) {
      setFilteredCountries(() => [...country]);
      setMsg(() => null);
    } else if (country.length < 1) {
      setFilteredCountries(() => [...countries]);
      setMsg(() => "country not found.");
    }
    setLoading(() => false);
  }, [searchQuery, countries, setFilteredCountries]);

  useEffect(() => {
    if (countries.length > 100) return;
    if (
      msg === "Please refresh and try again." ||
      msg === "Fetch error, please refresh try again." ||
      (countries.length < 10 && msg !== null)
    ) {
      setCountries(() => [...data]);
      setFilteredCountries(() => [...data]);
      setMsg(() => null);
      setNetwork(() => "local");
    }
  }, [
    countries.length,
    setCountries,
    setFilteredCountries,
    setNetwork,
    data,
    msg,
  ]);

  function handleCloseFilter() {
    setShow(() => false);
  }
  function handleResetQuery() {
    if (searchQuery === "") return;
    setSearchQuery(() => "");
    if (selectedFilter === null) {
      setFilteredCountries(() => [...countries]);
      return;
    }
    let currentContinentCountries = findContinent(countries, selectedFilter);
    setFilteredCountries(() => [...currentContinentCountries]);
  }
  return (
    <ThemeProvider>
      <Assemble
        handleQuery={handleQuery}
        filteredCountries={filteredCountries}
        countries={countries}
        onFilter={handleFilter}
        query={searchQuery}
        msg={network}
        show={show}
        setShow={setShow}
        onAction={handleCloseFilter}
        userMsg={msg}
        resetQuery={handleResetQuery}
      />
      {loading || (countries.length < 100 && <Loading />)}
    </ThemeProvider>
  );
}

export default App;
