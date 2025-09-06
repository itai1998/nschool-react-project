import '../scss/StoreInfo.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { storeInfoList } from './lists/storeInfoList'
import StoreCard from './StoreCard'

export default function StoreInfo() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4.5,
    arrows: true,
  }

  return (
    <div className="storeInfoContainer">
      <h2 className="storeInfoTitle">
        Apple Store 就是不同。
        <span style={{ color: 'grey' }}>有更多好理由，吸引你在這選購。</span>
      </h2>
      <div className="sliderContainer">
        <Slider {...settings}>
          {storeInfoList.map((option, index) => (
            <StoreCard key={index} img={option.img} text={option.text} />
          ))}
        </Slider>
      </div>
    </div>
  )
}
