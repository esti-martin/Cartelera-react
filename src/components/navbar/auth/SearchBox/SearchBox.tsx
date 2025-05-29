import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgSearch } from "react-icons/cg";
import styles from "./SearchBox.module.css";
import type { JSX } from "react";

// Añadimos el prop onSearch
type SearchBoxProps = {
  onSearch?: () => void;
};

function SearchBox({ onSearch }: SearchBoxProps): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      // Llamamos a onSearch si se ha pasado como prop
      if (onSearch) onSearch();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.box}>
      <input
        className="bg-transparent"
        type="text"
        placeholder="Buscar"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
      />
      <button className="bg-transparent" type="submit">
        <CgSearch className={styles.searchIcon} size={32} />
      </button>
    </form>
  );
}

export default SearchBox;
