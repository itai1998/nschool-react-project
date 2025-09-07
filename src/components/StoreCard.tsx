import '../scss/StoreCard.scss'
import type { ReactNode } from 'react'

interface StoreCardProps {
  img: string
  text: ReactNode
}

export default function StoreCard({ img, text }: StoreCardProps) {
  return (
    <div className="storeCardContainer">
      <img src={img} alt="laptop" />
      {text}
    </div>
  )
}
