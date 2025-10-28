import styles from "../../scss/MegaMenu.module.scss";
import searchIcon from "../../img/search-interface-symbol.png";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  onMouseLeave: () => void;
}

export default function SearchBar({ onMouseLeave }: SearchBarProps) {
  const navigate = useNavigate();
  return (
    <div className={styles.searchMenu} onMouseLeave={onMouseLeave}>
      <div className={styles.searchBar}>
        <img src={searchIcon} alt="search" className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search apple.com"
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              (e.target as HTMLInputElement).value.length > 0
            ) {
              navigate(`/search?query=${(e.target as HTMLInputElement).value}`);
            }
          }}
        />
      </div>
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
