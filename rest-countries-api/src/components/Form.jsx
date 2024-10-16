import { Link } from "react-router-dom";
import styles from "./Form.module.css";
import { useState } from "react";

function Form() {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div>
        <label htmlFor="search-country"></label>
        <input
          type="text"
          id="search-country"
          name="search-country"
          className={styles["search-input"]}
          placeholder="search for the country..."
        />
        <i>icon</i>
      </div>

      <button onClick={() => setShow(!show)}>
        Filter by Region <span>^</span>
        <div className={show ? styles.show : styles["dropdown-content"]}>
          <p>list here</p>
          {/* <Link to="">Africa</Link>
          <Link value="america">America</Link>
          <Link value="asia">Asia</Link>
          <link value="europe">Europe</link>
          <Link value="oceania">Oceania</Link> */}
        </div>
      </button>
    </div>
  );
}

export default Form;
