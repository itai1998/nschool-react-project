import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../scss/MegaMenu.module.scss";
import { productOneOptions } from "../lists/menuOptions";
import searchIcon from "../../img/search-interface-symbol.png";
import marketIcon from "../../img/market.png";
import appleLogo from "../../img/apple-logo.png";

// TypeScript interfaces
interface LinkGroup {
  [key: string]: string;
}

interface ProductOption {
  product: string;
  [key: string]: any;
}

function MegaMenu() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const menuRef = useRef<HTMLLIElement>(null);
  const navigate = useNavigate();

  // Close search when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setSearchOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Helper function to get menu data for a specific product
  const getProductMenuData = (productName: string) => {
    return productOneOptions.find((option) => option.product === productName);
  };

  // Helper function to render menu columns dynamically
  const renderMenuColumns = (menuData: ProductOption | undefined) => {
    if (!menuData) return null;

    // Get all category keys dynamically (category1, category2, category3, etc.)
    const categoryKeys = Object.keys(menuData).filter((key) =>
      key.startsWith("category")
    );

    return categoryKeys.map((categoryKey, index) => {
      const category = menuData[categoryKey];
      if (!category) return null;

      return (
        <div key={index} className={styles.megaColumn}>
          <h4>{category.title}</h4>
          {category.links?.map((linkGroup: LinkGroup, linkIndex: number) => (
            <div key={linkIndex}>
              {/* Dynamically render all links in the linkGroup */}
              {Object.values(linkGroup).map(
                (link: string, linkItemIndex: number) => (
                  <a key={linkItemIndex} href="#">
                    {link}
                  </a>
                )
              )}
            </div>
          ))}
        </div>
      );
    });
  };

  const handleProductMouseEnter = (productName: string) => {
    setHoveredProduct(productName);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
    setHoveredProduct(null);
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <li onMouseLeave={handleMouseLeave} ref={menuRef}>
          <img src={appleLogo} alt={"appleLogo"} />
          {productOneOptions.map((product, index) => (
            <button
              key={index}
              className={styles.navButton}
              onMouseEnter={() => {
                handleProductMouseEnter(product.product);
                setSearchOpen(false);
              }}
            >
              {product.product}
            </button>
          ))}
          <button className={styles.navButton}> Vision</button>
          <button className={styles.navButton}> AirPods</button>
          <button className={styles.navButton}> TV 和家庭</button>
          <button className={styles.navButton}> 娛樂</button>
          <button className={styles.navButton}> 配件</button>
          <button className={styles.navButton}> 支援服務</button>
          <img
            src={searchIcon}
            alt={"search"}
            onClick={() => setSearchOpen((prev) => !prev)}
            // onClick={() => navigate("/search")}
            onMouseEnter={() => handleMouseLeave()}
          />
          <img
            src={marketIcon}
            alt={"market"}
            onClick={() => navigate("/shopping-cart")}
            onMouseEnter={() => handleMouseLeave()}
          />

          {open && hoveredProduct && (
            <div
              className={styles.megaMenu}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={handleMouseLeave}
            >
              {renderMenuColumns(getProductMenuData(hoveredProduct))}
            </div>
          )}

          {searchOpen && (
            <div
              className={styles.searchMenu}
              onMouseLeave={() => setSearchOpen(false)}
            >
              <div className={styles.searchBar}>
                <img
                  src={searchIcon}
                  alt="search"
                  className={styles.searchIcon}
                />
                <input type="text" placeholder="Search apple.com" />
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
          )}
        </li>
      </ul>
    </nav>
  );
}

export default MegaMenu;
