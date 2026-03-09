import styles from "../../scss/SearchBar.module.scss";
import searchIcon from "../../img/search-interface-symbol.png";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useDebouncedSearch } from "../../hooks/useDebouncedSearch";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../../model/product";
import { getProducts } from "../../api/productApi";
import { map, toLower, includes, filter, trim } from "lodash";

interface SearchBarProps {
  onMouseLeave: () => void;
}

export default function SearchBar({ onMouseLeave }: SearchBarProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { debouncedSearch } = useDebouncedSearch(search);
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await getProducts();
      return response.data;
    },
    enabled: debouncedSearch.length !== 0,
  });

  const suggestions = useMemo(() => {
    if (!products || debouncedSearch.length === 0) return [];

    const lowerSearch = toLower(trim(debouncedSearch));

    return map(
      filter(products, (item: Product) =>
        includes(toLower(item.name), lowerSearch)
      ),
      "name"
    );
  }, [products, debouncedSearch]);

  const handleSuggestionClick = (suggestion: string) => {
    navigate(`/search?query=${suggestion}`);
  };

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
            <h6
              key={suggestion}
              className={styles.suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
            >
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
