import { useState, useRef } from 'react'
import styles from '../scss/MegaMenu.module.scss'

function MegaMenu() {
  const [open, setOpen] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const menuRef = useRef<HTMLLIElement>(null)

  console.log('menuRef', menuRef)

  const handleProductMouseEnter = (productName: string) => {
    setHoveredProduct(productName)
    setOpen(true)
    console.log(`Hovering over: ${productName}`)
  }

  const handleMouseLeave = () => {
    setOpen(false)
    setHoveredProduct(null)
  }

  return (
    <nav className={styles.navbar}>
      <ul>
        <li onMouseLeave={handleMouseLeave} ref={menuRef}>
          <button
            className={styles.navButton}
            onMouseEnter={() => handleProductMouseEnter('Product 1')}
          >
            Product 1 ▾
          </button>
          <button
            className={styles.navButton}
            onMouseEnter={() => handleProductMouseEnter('Product 2')}
          >
            Product 2 ▾
          </button>
          <button
            className={styles.navButton}
            onMouseEnter={() => handleProductMouseEnter('Product 3')}
          >
            Product 3 ▾
          </button>

          {open && hoveredProduct === 'Product 1' && (
            <div
              className={styles.megaMenu}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.megaColumn}>
                <h4>p1 - Category 1</h4>
                <a href="#">p1 Item 1</a>
                <a href="#">p1 Item 2</a>
              </div>
              <div className={styles.megaColumn}>
                <h4>p1 - Category 2</h4>
                <a href="#">p1 Item 3</a>
                <a href="#">p1 Item 4</a>
              </div>
              <div className={styles.megaColumn}>
                <h4>p1 - Category 3</h4>
                <a href="#">p1 Item 5</a>
                <a href="#">p1 Item 6</a>
              </div>
            </div>
          )}

          {open && hoveredProduct === 'Product 2' && (
            <div
              className={styles.megaMenu}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.megaColumn}>
                <h4>p2 - Category 1</h4>
                <a href="#">p2 Item 1</a>
                <a href="#">p2 Item 2</a>
              </div>
              <div className={styles.megaColumn}>
                <h4>p2 - Category 2</h4>
                <a href="#">p2 Item 3</a>
                <a href="#">p2 Item 4</a>
              </div>
              <div className={styles.megaColumn}>
                <h4>p2 - Category 3</h4>
                <a href="#">p2 Item 5</a>
                <a href="#">p2 Item 6</a>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default MegaMenu
