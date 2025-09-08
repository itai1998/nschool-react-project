import '../scss/SlickLarge.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import InformationCard from './InformationCard'
import { serviceInfoList } from './lists/serviceInfoList'

export default function ServiceInformation() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    arrows: true,
  }

  return (
    <div className="slickLargeContainer">
      <h2 className="slickLargeTitle">
        為你幫幫忙。
        <span style={{ color: 'grey' }}>以各種方式隨時提供你需要的協助。</span>
      </h2>
      <div className="sliderContainer">
        <Slider {...settings}>
          {serviceInfoList.map((option) => (
            <InformationCard
              key={option.title}
              img={option.img}
              title={option.title}
              description={option.description}
              label={option.label}
              width="480px"
            />
          ))}
        </Slider>
      </div>
    </div>
  )
}
