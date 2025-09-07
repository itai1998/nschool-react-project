import '../scss/ProductCard.scss'

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
    <div className="productCardContainer">
      <img src={img} alt="product" />
      <p className="label">{label}</p>
      <h4 className="title">{title}</h4>
      <h4 className="price">{price}</h4>
    </div>
  )
}
