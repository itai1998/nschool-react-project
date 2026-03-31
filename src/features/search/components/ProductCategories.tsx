import type { Category } from "../../../model/category";
import styles from "../../../scss/Search.module.scss";

interface ProductCategoriesProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}
export default function ProductCategories({
  categories,
  selectedCategory,
  setSelectedCategory,
}: ProductCategoriesProps) {
  return (
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
  );
}
