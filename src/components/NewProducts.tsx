import '../scss/NewProducts.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
export default function NewProducts() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,
    arrows: true,
  }
  return (
    <div className="newProductsContainer">
      <h3>NewProducts</h3>
      <div className="sliderContainer">
        <Slider {...settings}>
          <div>
            <h4>1</h4>
          </div>
          <div>
            <h4>2</h4>
          </div>
          <div>
            <h4>3</h4>
          </div>
          <div>
            <h4>4</h4>
          </div>
          <div>
            <h4>5</h4>
          </div>
          <div>
            <h4>6</h4>
          </div>
        </Slider>
      </div>
    </div>
  )
}
