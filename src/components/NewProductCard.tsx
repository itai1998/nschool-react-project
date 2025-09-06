import '../scss/NewProductCard.scss'

interface NewProductCardProps {
  img: string
  title: string
  subtitle?: string
  description?: string
  textColor?: string
  label?: string
  width?: string
}

export default function NewProductCard({
  img,
  title,
  subtitle = '',
  description = '',
  textColor = 'black',
  label = '',
  width = '400px',
}: NewProductCardProps) {
  return (
    <div className="newProductCardContainer" style={{ maxWidth: width }}>
      <p className="label">{label}</p>
      <div className="cardContent" style={{ color: textColor }}>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <h4>{description}</h4>
      </div>
      <img src={img} />
    </div>
  )
}
