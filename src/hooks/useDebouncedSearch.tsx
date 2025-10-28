import { useEffect, useState } from "react";

export const useDebouncedSearch = (search: string, delay = 500) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);
    return () => clearTimeout(debounce);
  }, [search]);
  return { debouncedSearch };
};
