import iphoneProImg from '../img/newProductsImg/iphonePro.jpg'
import '../scss/NewProductCard.scss'

interface NewProductCardProps {
  img: string
  title: string
  subtitle?: string
  description?: string
  textColor?: string
}

export default function NewProductCard({
  img,
  title,
  subtitle = '',
  description = '',
  textColor = 'black',
}: NewProductCardProps) {
  return (
    <div className="newProductCardContainer">
      <div className="cardContent" style={{ color: textColor }}>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <h4>{description}</h4>
      </div>
      <img src={img} />
    </div>
  )
}
