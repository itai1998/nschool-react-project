import iphoneProImg from '../img/newProductsImg/iphonePro.jpg'
import '../scss/NewProductCard.scss'

export default function NewProductCard() {
  return (
    <div className="newProductCardContainer">
      <div className="cardContent">
        <h2>NewProductCard</h2>
        <h3>NewProductCard</h3>
        <h4>NewProductCard</h4>
      </div>
      <img src={iphoneProImg} alt="NewProductCard" />
    </div>
  )
}
