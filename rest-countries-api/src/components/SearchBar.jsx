import styles from "./SearchBar.module.css";
function SearchBar({ onAction }) {
  return (
    <div>
      <label htmlFor="search-country"></label>
      <input
        type="text"
        id="search-country"
        name="search-country"
        onChange={(e) => onAction(e)}
        className={styles["search-input"]}
        placeholder="search for the country..."
      />
      <i>icon</i>
    </div>
  );
}

export default SearchBar;
