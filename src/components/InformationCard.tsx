import styles from '../scss/InformationCard.module.scss'

interface InformationCardProps {
  img: string
  title: string
  subtitle?: string
  description?: string | React.ReactNode
  textColor?: string
  labelColor?: string
  label?: string
  width?: string
}

export default function InformationCard({
  img,
  title,
  subtitle = '',
  description = '',
  textColor = 'black',
  labelColor = 'black',
  label = '',
  width = '400px',
}: InformationCardProps) {
  return (
    <div
      className={styles.informationCardContainer}
      style={{ maxWidth: width }}
    >
      <p className={styles.label} style={{ color: labelColor }}>
        {label}
      </p>
      <div className={styles.cardContent} style={{ color: textColor }}>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <h4>{description}</h4>
      </div>
      <img src={img} />
    </div>
  )
}
