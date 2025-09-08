import '../scss/SlickMedium.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import InformationCard from './InformationCard'
import { discountList } from './lists/discountList'
export default function DiscountInfo() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    arrows: true,
  }

  return (
    <div className="slickMediumContainer">
      <h2 className="slickMediumTitle">
        優惠與折扣。
        <span style={{ color: 'grey' }}>
          獨家優惠、專屬商店，以及更多精彩。
        </span>
      </h2>
      <div className="sliderContainer">
        <div className="discountListContainer">
        <Slider {...settings}>
          {discountList.map((option) => (
            <InformationCard
              key={option.title}
              img={option.img}
              title={option.title}
              label={option.label}
              labelColor={option.labelColor}
              textColor={option.textColor}
            />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}
