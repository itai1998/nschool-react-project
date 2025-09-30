import axios from "axios";
import styles from "../scss/Search.module.scss";
// import { macbookList } from "./lists/macbookList";
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
  const [search, setSearch] = useState("");

  useEffect(() => {
    const asyncData = async () => {
      const res = await axios.get<MockData>("/src/data/macbookMock.json");
      setData(res.data);
    };
    asyncData();
  }, []);

  return (
    <div>
      <h1>This is the search component</h1>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <h3>{search}</h3>
      <div className={styles.flexContainer}>
        {data?.macbooks
          .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
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
