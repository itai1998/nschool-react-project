import styles from "../scss/Search.module.scss";
import { macbookList } from "./lists/macbookList";

export default function Search() {
  return (
    <div>
      <h1>This is the search component</h1>
      <input type="text" placeholder="Search" />
      <div className={styles.flexContainer}>
        {macbookList.map((item) => (
          <div key={item.name} className={styles.productBox}>
            <h2>{item.name}</h2>
            <h3>{item.price}</h3>
            <h4>{item.type}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
