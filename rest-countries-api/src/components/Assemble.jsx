import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import CountryList from "./CountryList";
import Detail from "./Detail-Page";
import { useTheme } from "./ThemeContext";
import styles from "./Assemble.module.css";
import { useState } from "react";
import useLocalStorageState from "./useLocalStorageState";

function Assemble({
  handleQuery,
  filteredCountries,
  countries,
  onFilter,
  query,
  msg,
  show,
  setShow,
  onAction,
  userMsg,
  resetQuery,
}) {
  const { theme } = useTheme();
  const [showDetail, setDetail] = useState(true);

  function handleDetailPage(value) {
    if (typeof value !== "boolean") return; // Ensure value is a boolean
    setDetail(() => value);
  }

  return (
    <>
      {showDetail && <Header />}
      <main
        className={`${styles.main}  ${
          theme === "light" ? styles.lightMode : styles.darkMode
        }`}
      >
        {showDetail && (
          <nav className="wrapper">
            <SearchBar onAction={handleQuery} query={query} msg={userMsg} />
            <Filter onFilter={onFilter} show={show} setShow={setShow} />
          </nav>
        )}

        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <CountryList
                  countries={filteredCountries}
                  onDetail={handleDetailPage}
                  onAction={onAction}
                />
              }
            />
            <Route
              path="/countries"
              element={
                <CountryList
                  countries={filteredCountries}
                  onDetail={handleDetailPage}
                  onAction={onAction}
                />
              }
            />
            <Route
              path="countries/:name"
              element={
                <Detail
                  countries={countries}
                  onDetail={handleDetailPage}
                  msg={msg}
                  resetQuery={resetQuery}
                />
              }
            />
            )
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default Assemble;
