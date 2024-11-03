import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import CountryList from "./CountryList";
import Detail from "./Detail-Page";
import { useTheme } from "./ThemeContext";
import styles from "./Assemble.module.css";
function Assemble({ handleQuery, filteredCountries, countries }) {
  const { theme } = useTheme();
  return (
    <>
      <Header />

      <main
        className={`${styles["flex-row"]}  ${
          theme === "light" ? styles.lightMode : styles.darkMode
        }`}
      >
        <nav className="wrapper">
          <SearchBar onAction={handleQuery} />
          <Filter />
        </nav>

        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<CountryList countries={filteredCountries} />}
            />

            <Route
              path="/countries"
              element={<CountryList countries={filteredCountries} />}
            />

            <Route
              path="countries/:name"
              element={<Detail countries={countries} />}
            />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default Assemble;
