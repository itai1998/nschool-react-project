import styles from "../scss/Search.module.scss";
import { useState, useEffect, useRef } from "react";
import { getProducts } from "../api";
import { type Macbook } from "../api/constants/macbook";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [data, setData] = useState<Macbook[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Macbook[]>();
  const { debouncedSearch } = useDebouncedSearch(search);
  const hasAppliedQueryRef = useRef(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProducts();
      setData(res.data);

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

  useEffect(() => {
    const query = searchParams.get("query");

    if (query && data.length > 0 && !hasAppliedQueryRef.current) {
      setSearch(query);
      handleSearch(query);
      setOpen(false);
      hasAppliedQueryRef.current = true;
    }
  }, [data, searchParams]);

  const handleSearch = (inputText: string) => {
    const filteredResults = data?.filter((item) =>
      item.name.toLowerCase().includes(inputText.toLowerCase())
    );
    setResults(filteredResults || []);
  };

  const handleSuggestionClick = (suggestion: string) => {
    navigate(`/search?query=${suggestion}`);
    setSearch(suggestion);
    handleSearch(suggestion);
    setOpen(false);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputWrapper}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value.length > 0) {
                setOpen(true);
              } else {
                setOpen(false);
              }
            }}
            onFocus={() => {
              if (search.length > 0) {
                setOpen(true);
              }
            }}
          />
          <button
            className={styles.searchButton}
            type="button"
            onClick={() => {
              handleSearch(search);
              navigate(`/search?query=${search}`);
              setOpen(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>

          {open && (
            <div className={styles.suggestions}>
              <ul>
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{ cursor: "pointer" }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={styles.flexContainer}>
        {results && results.length > 0 ? (
          results.map((item) => (
            <div key={item.name} className={styles.productBox}>
              <h2>{item.name}</h2>
              <h3>{item.price}</h3>
              <h4>{item.type}</h4>
            </div>
          ))
        ) : results && results.length === 0 ? (
          <p>No products found</p>
        ) : null}
      </div>
    </div>
  );
}
