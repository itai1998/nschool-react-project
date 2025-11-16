import styles from "../scss/Search.module.scss";
import { useState, useEffect, useRef } from "react";
import { getProducts, getCategories } from "../api";
import { type Macbook } from "../api/constants/macbook";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import type { Category } from "../api/constants/category";

export default function Search() {
  const navigate = useNavigate();
  const [data, setData] = useState<Macbook[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Macbook[]>();
  const { debouncedSearch } = useDebouncedSearch(search);
  const [searchParams] = useSearchParams();
  const lastProcessedQueryRef = useRef<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

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

    // Only update if query actually changed and data is available
    if (query && data.length > 0 && query !== lastProcessedQueryRef.current) {
      lastProcessedQueryRef.current = query;
      setSearch(query);
      handleSearch(query);
      setOpen(false);
    } else if (!query) {
      // Reset the ref when query is removed
      lastProcessedQueryRef.current = null;
    }
  }, [searchParams, data]);

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
            onBlur={() => {
              setOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (search.length > 0) {
                  navigate(`/search?query=${search}`);
                } else {
                  navigate(`/search`);
                  handleSearch("");
                }
                setOpen(false);
              }
            }}
          />
          <button
            className={styles.searchButton}
            type="button"
            onClick={() => {
              if (search.length > 0) {
                navigate(`/search?query=${search}`);
              } else {
                navigate(`/search`);
                handleSearch("");
              }
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
                    onMouseDown={() => handleSuggestionClick(suggestion)}
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
      <div className={styles.searchContent}>
        <div className={styles.categoriesContainer}>
          <h3 className={styles.categoriesTitle}>產品類型</h3>
          {categories.map((category) => (
            <div className={styles.categoryItem} key={category.id}>
              {selectedCategory === category.category ? (
                <h3 className={styles.selectedCategory}>{category.category}</h3>
              ) : (
                <h3 onClick={() => setSelectedCategory(category.category)}>
                  {category.category}
                </h3>
              )}
            </div>
          ))}
        </div>

        <div className={styles.flexContainer}>
          {results && results.length > 0 ? (
            results
              .filter((item) =>
                selectedCategory === "all"
                  ? item
                  : item.type === selectedCategory
              )
              .map((item) => (
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
    </div>
  );
}
