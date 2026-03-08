import { useQuery } from "@tanstack/react-query";
import styles from "../scss/Search.module.scss";
import { useState, useEffect, useRef, useMemo } from "react";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";
import { getProducts } from "../api/productApi";
import type { Product } from "../model/product";
import { map, trim, toLower, includes, filter } from "lodash";
import AvailableProducts from "./AvailableProducts";
import ProductCategories from "./ProductCategories";

export default function Search() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const { debouncedSearch } = useDebouncedSearch(search);
  const [searchParams] = useSearchParams();
  const lastSyncedUrlQueryRef = useRef<string | null>(null);
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await getProducts();
      return response.data;
    },
  });

  const productList = products ?? [];

  const suggestionNames = useMemo(() => {
    const q = trim(debouncedSearch);
    if (!q) return [];
    const lower = toLower(q);
    return map(
      filter(productList, (item: Product) =>
        includes(toLower(item.name), lower)
      ),
      "name"
    );
  }, [productList, debouncedSearch]);

  const urlQuery = searchParams.get("query") ?? "";
  const searchResults = useMemo(() => {
    const q = trim(urlQuery);
    if (!q) return productList;
    const lower = toLower(q);
    return filter(productList, (item: Product) =>
      includes(toLower(item.name), lower)
    );
  }, [productList, urlQuery]);

  const displayedProducts = useMemo(() => {
    if (selectedCategory === "all") return searchResults;
    return filter(
      searchResults,
      (item: Product) => item.category === selectedCategory
    );
  }, [searchResults, selectedCategory]);

  useEffect(() => {
    const query = searchParams.get("query");

    if (
      query &&
      productList.length > 0 &&
      query !== lastSyncedUrlQueryRef.current
    ) {
      lastSyncedUrlQueryRef.current = query;
      setSearch(query);
      setIsSuggestionsOpen(false);
    } else if (!query) {
      lastSyncedUrlQueryRef.current = null;
    }
  }, [searchParams, productList.length]);

  const handleSuggestionSelect = (suggestion: string) => {
    navigate(`/search?query=${encodeURIComponent(suggestion)}`);
    setSearch(suggestion);
    setIsSuggestionsOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                setIsSuggestionsOpen(true);
              } else {
                setIsSuggestionsOpen(false);
              }
            }}
            onFocus={() => {
              if (search.length > 0) {
                setIsSuggestionsOpen(true);
              }
            }}
            onBlur={() => {
              setIsSuggestionsOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (search.length > 0) {
                  navigate(`/search?query=${search}`);
                } else {
                  navigate(`/search`);
                }
                setIsSuggestionsOpen(false);
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
              }
              setIsSuggestionsOpen(false);
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

          {isSuggestionsOpen && (
            <div className={styles.suggestions}>
              <ul>
                {suggestionNames.map((suggestion) => (
                  <li
                    key={suggestion}
                    onMouseDown={() => handleSuggestionSelect(suggestion)}
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
        <ProductCategories
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <AvailableProducts products={displayedProducts} />
      </div>
    </div>
  );
}
