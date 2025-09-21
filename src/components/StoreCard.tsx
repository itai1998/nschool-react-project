import styles from '../scss/StoreCard.module.scss'
import type { ReactNode } from 'react'

interface StoreCardProps {
  img: string
  text: ReactNode
}

export default function StoreCard({ img, text }: StoreCardProps) {
  return (
    <div className={styles.storeCardContainer}>
      <img src={img} alt="laptop" />
      {text}
    </div>
  )
}
