import { useEffect, useState, useMemo } from "react";
import debounce from "lodash/debounce";

export const useDebouncedSearch = (search: string, delay = 500) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const debouncedSet = useMemo(
    () => debounce((v: string) => setDebouncedSearch(v), delay),
    [delay]
  );

  useEffect(() => {
    debouncedSet(search);
    return () => debouncedSet.cancel();
  }, [search, debouncedSet]);

  return { debouncedSearch };
};
