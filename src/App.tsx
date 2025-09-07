import './App.scss'
import Footer from './components/Footer'
import HelperOptions from './components/HelperOptions'
import Intro from './components/Intro'
import Links from './components/Links'
import NavBar from './components/NavBar'
import NewProducts from './components/NewProducts'
import ProductCard from './components/ProductCard'
import Products from './components/Products'
import StoreInfo from './components/StoreInfo'
import iphonePink from './img/productImg/iphonePink.jpg'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Intro />
      <Products />
      <NewProducts />
      <HelperOptions />
      <StoreInfo />
      <ProductCard
        img={iphonePink}
        label="Apple"
        title="iPhone 16"
        price="NT$30,000"
      />
      <Links />
      <Footer />
    </div>
  )
}

export default App
