import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { deviceProductList } from '../lists/deviceProductList'
import ProductCard from '../ProductCard'
import InformationCard from '../InformationCard'
import iphoneWatchImg from '../../img/productImg/iphonWatch.jpg'
import iphone2Img from '../../img/productImg/iphone2.jpg'

export default function DeviceProducts() {
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
        周邊配件。
        <span style={{ color: 'grey' }}>
          精彩配件，款款都是心愛裝置的必搭絕配。
        </span>
      </h2>
      <div className="sliderContainer">
        <Slider {...settings}>
          <div className="slideItem">
            <InformationCard
              img={iphoneWatchImg}
              title={'跟緊潮流新色。'}
              description={
                <>
                  你喜愛的配件，
                  <br />
                  新色上身。
                </>
              }
            />
          </div>
          {deviceProductList.map((option) => (
            <div key={option.title} className="slideItem">
              <ProductCard
                img={option.img}
                label={option.label}
                title={option.title}
                price={option.price}
              />
            </div>
          ))}
          <div className="slideItem">
            <InformationCard img={iphone2Img} title={'探索所有配件。'} />
          </div>
        </Slider>
      </div>
    </div>
  )
}
