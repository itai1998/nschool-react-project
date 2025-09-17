import styles from '../scss/ProductCategory.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import mac from '../img/mac.png'
import iphone from '../img/iphone.png'
import ipad from '../img/ipad.png'
import appleWatch from '../img/appleWatch.png'
import appleVisionPro from '../img/visionPro.png'
import airPods from '../img/airPods.png'
import airTag from '../img/airTag.png'
import homePod from '../img/homePod.png'
import accessories from '../img/others.png'
import appleStoreGiftCard from '../img/appleStore.png'

export default function Products() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 9,
    arrows: true,
    prevArrow: (
      <button type="button" className={styles.slickPrev}>
        Previous
      </button>
    ),
    nextArrow: (
      <button type="button" className={styles.slickNext}>
        Next
      </button>
    ),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const products = [
    {
      displayName: 'Mac',
      image: mac,
      url: '/',
    },
    {
      displayName: 'iPhone',
      image: iphone,
      url: '/',
    },
    {
      displayName: 'iPad',
      image: ipad,
      url: '/',
    },
    {
      displayName: 'Apple Watch',
      image: appleWatch,
      url: '/',
    },
    {
      displayName: 'Apple Vision Pro',
      image: appleVisionPro,
      url: '/',
    },
    {
      displayName: 'AirPods',
      image: airPods,
      url: '/',
    },
    {
      displayName: 'AirTag',
      image: airTag,
      url: '/',
    },
    {
      displayName: 'HomePod',
      image: homePod,
      url: '/',
    },
    {
      displayName: '配件',
      image: accessories,
      url: '/',
    },
    {
      displayName: 'Apple Store 禮品卡',
      image: appleStoreGiftCard,
      url: '/',
    },
  ]
  return (
    <div className={styles.productCategoryContainer}>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.displayName}>
            <img src={product.image} alt={product.displayName} />
            <p>{product.displayName}</p>
          </div>
        ))}
      </Slider>
    </div>
  )
}
