import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import InformationCard from './InformationCard'
import { newProducts } from '../NewProductList'
export default function NewProducts() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3.55,
    arrows: true,
  }

  return (
    <div className="slickMediumContainer">
      <h2 className="slickMediumTitle">
        最新登場。
        <span style={{ color: 'grey' }}>現在就來看看有哪些新品推薦。</span>
      </h2>
      <div className="sliderContainer">
        <Slider {...settings}>
          {newProducts.map((product) => (
            <InformationCard
              key={product.title}
              img={product.img}
              title={product.title}
              subtitle={product.subtitle}
              description={product.description}
              textColor={product.textColor}
              label={product.label}
              labelColor={product.labelColor}
            />
          ))}
        </Slider>
      </div>
    </div>
  )
}
