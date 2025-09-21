import styles from '../scss/ProductCard.module.scss'

interface ProductCardProps {
  img: string
  label?: string
  title: string
  price: string
}

export default function ProductCard({
  img,
  label = '',
  title,
  price,
}: ProductCardProps) {
  return (
    <div className={styles.productCardContainer}>
      <img src={img} alt="product" />
      <p className={styles.label}>{label}</p>
      <h4 className={styles.title}>{title}</h4>
      <h4 className={styles.price}>{price}</h4>
    </div>
  )
}
