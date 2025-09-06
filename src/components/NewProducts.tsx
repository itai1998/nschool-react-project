import '../scss/NewProducts.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import NewProductCard from './NewProductCard'
import iphoneProImg from '../img/newProductsImg/iphonePro.jpg'
import ipadAirImg from '../img/newProductsImg/ipadAir.jpg'
export default function NewProducts() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,
    arrows: true,
  }

  const newProducts = [
    {
      img: iphoneProImg,
      title: 'iPhone 16 Pro',
      subtitle: 'iPhone 的極致。',
      description: 'NT$36,900 起',
      textColor: 'white',
    },
    {
      img: ipadAirImg,
      title: 'iPad Air',
      subtitle: '飛之速',
      description: 'NT$36,900 起',
    },
    {
      img: iphoneProImg,
      title: 'iPhone 16 Pro',
      subtitle: 'iPhone 的極致。',
      description: 'NT$36,900 起',
    },
    {
      img: iphoneProImg,
      title: 'iPhone 16 Pro',
      subtitle: 'iPhone 的極致。',
      description: 'NT$36,900 起',
    },
  ]
  return (
    <div className="newProductsContainer">
      <h3 className="newProductsTitle">NewProducts</h3>
      <div className="sliderContainer">
        <Slider {...settings}>
          {newProducts.map((product) => (
            <NewProductCard
              key={product.title}
              img={product.img}
              title={product.title}
              subtitle={product.subtitle}
              description={product.description}
              textColor={product.textColor}
            />
          ))}
        </Slider>
      </div>
    </div>
  )
}
