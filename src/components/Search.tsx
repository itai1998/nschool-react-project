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
import { SearchInput } from "./SearchInput";

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

  const handleSearchSubmit = () => {
    if (search.length > 0) {
      navigate(`/search?query=${search}`);
    } else {
      navigate(`/search`);
    }
    setIsSuggestionsOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.searchContainer}>
      <SearchInput
        search={search}
        setSearch={setSearch}
        isSuggestionsOpen={isSuggestionsOpen}
        setIsSuggestionsOpen={setIsSuggestionsOpen}
        suggestionNames={suggestionNames}
        onSuggestionSelect={handleSuggestionSelect}
        onSearchSubmit={handleSearchSubmit}
      />
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
