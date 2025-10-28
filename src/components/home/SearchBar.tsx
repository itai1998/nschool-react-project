import styles from "../../scss/SearchBar.module.scss";
import searchIcon from "../../img/search-interface-symbol.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Macbook } from "../../api/constants/macbook";
import { useDebouncedSearch } from "../../hooks/useDebouncedSearch";
import { getProducts } from "../../api";

interface SearchBarProps {
  onMouseLeave: () => void;
}

export default function SearchBar({ onMouseLeave }: SearchBarProps) {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Macbook[]>();
  const { debouncedSearch } = useDebouncedSearch(search);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProducts();

      if (!results) {
        setResults(res.data);
      }

      if (debouncedSearch.length !== 0) {
        const filteredSuggestions = res.data
          .filter((item: Macbook) =>
            item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
          .map((item: Macbook) => item.name);
        setSuggestions(filteredSuggestions);
      }
    };

    fetchData();
  }, [debouncedSearch]);

  return (
    <div className={styles.searchMenu} onMouseLeave={onMouseLeave}>
      <div className={styles.searchBar}>
        <img src={searchIcon} alt="search" className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search apple.com"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && search.length > 0) {
              navigate(`/search?query=${search}`);
            }
          }}
        />
      </div>

      {suggestions.length > 0 && (
        <div className={styles.suggestions}>
          <h6 className={styles.suggestionsTitle}>建議連結</h6>
          {suggestions.map((suggestion) => (
            <h6 key={suggestion} className={styles.suggestion}>
              <span>→</span> {suggestion}
            </h6>
          ))}
        </div>
      )}

      <div className={styles.quickLinks}>
        <h6 className={styles.quickLinksTitle}>快速連結</h6>
        <h6>
          <span>→</span> 尋找直營店
        </h6>
        <h6>
          <span>→</span> Apple Vision Pro
        </h6>
        <h6>
          <span>→</span> AirPods
        </h6>
        <h6>
          <span>→</span> Apple Intelligence
        </h6>
        <h6>
          <span>→</span> Apple Trade In 換購方案
        </h6>
      </div>
    </div>
  );
}
