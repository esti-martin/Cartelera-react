import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgSearch } from "react-icons/cg";
import styles from "./SearchBox.module.css";

function SearchBox() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.box}>
      <input
        className="bg-transparent"
        type="text"
        placeholder="Buscar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="bg-transparent" type="submit">
        <CgSearch className={styles.searchIcon} size={32} />
      </button>
    </form>
  );
}

export default SearchBox;
