import axios from "axios";
import styles from "../scss/Search.module.scss";
import { useState, useEffect } from "react";
interface Product {
  id: number;
  name: string;
  price: string;
  type: string;
  description: string;
  image: string;
  availability: boolean;
  rating: number;
  specs?: {
    chip: string;
    cpu: string;
    gpu: string;
    memory: string;
    storage: string;
    display: string;
    color: string;
  };
}

interface MockData {
  macbooks: Product[];
}

export default function Search() {
  const [data, setData] = useState<MockData | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [results, setResults] = useState<Product[]>();

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search.length > 0) {
        setOpen(true);
      } else {
        setOpen(false);
      }

      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(debounce);
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get<MockData>("/src/data/macbookMock.json");
      setData(res.data);

      // Show all macbooks initially
      if (!results) {
        setResults(res.data.macbooks);
      }

      const filteredSuggestions = res.data.macbooks
        .filter((item) =>
          item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
        .map((item) => item.name);
      setSuggestions(filteredSuggestions);
    };
    fetchData();
  }, [debouncedSearch]);

  const handleSearch = (inputText: string) => {
    const filteredResults = data?.macbooks.filter((item) =>
      item.name.toLowerCase().includes(inputText.toLowerCase())
    );
    setResults(filteredResults || []);
  };

  return (
    <div>
      <h1>This is the search component</h1>

      <div className={styles.inputWrapper}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className={styles.searchButton}
            type="button"
            onClick={() => {
              handleSearch(search);
              setSearch("");
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
                  <li key={suggestion}>{suggestion}</li>
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
