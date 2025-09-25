import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import ProductCard from './ProductCard'
import InformationCard from './InformationCard'
import { speakerProductLists } from '../lists/speakerProductLists'
import appleMusic from '../../img/productImg/music.jpg'

export default function SpeakerProducts() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,
    arrows: true,
    variableWidth: true,
  }

  return (
    <div className="productContainer">
      <h2 className="productTitle">
        清亮動聽。
        <span style={{ color: 'grey' }}>
          層次豐富的高音質，款款都是好選擇。
        </span>
      </h2>
      <div className="sliderContainer">
        <Slider {...settings}>
          <div className="slideItem">
            <InformationCard
              img={appleMusic}
              title={'免費試用 Apple Music 3 個‍月。'}
              description={'購買特定 Apple 裝置即可獲享。'}
            />
          </div>
          {speakerProductLists.map((option) => (
            <div key={option.title} className="slideItem">
              <ProductCard
                img={option.img}
                label={option.label}
                title={option.title}
                price={option.price}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
