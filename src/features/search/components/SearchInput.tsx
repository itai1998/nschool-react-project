import styles from "../../../scss/Search.module.scss";

interface SearchInputProps {
  search: string;
  setSearch: (value: string) => void;
  isSuggestionsOpen: boolean;
  setIsSuggestionsOpen: (value: boolean) => void;
  suggestionNames: string[];
  onSuggestionSelect: (suggestion: string) => void;
  onSearchSubmit: () => void;
}

export function SearchInput({
  search,
  setSearch,
  isSuggestionsOpen,
  setIsSuggestionsOpen,
  suggestionNames,
  onSuggestionSelect,
  onSearchSubmit,
}: SearchInputProps) {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            if (value.length > 0) {
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
              onSearchSubmit();
            }
          }}
        />
        <button
          className={styles.searchButton}
          type="button"
          onClick={onSearchSubmit}
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
                  onMouseDown={() => onSuggestionSelect(suggestion)}
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
  );
}
