import './App.scss'
import DeviceProducts from './components/DeviceProducts'
import Footer from './components/Footer'
import HelperOptions from './components/HelperOptions'
import Intro from './components/Intro'
import Links from './components/Links'
import NavBar from './components/NavBar'
import NewProducts from './components/NewProducts'
import Products from './components/Products'
import ServiceInformation from './components/ServiceInformation'
import SpeakerProducts from './components/SpeakerProducts'
import StoreInfo from './components/StoreInfo'
import DiscountInfo from './components/DiscountInfo'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Intro />
      <Products />
      <NewProducts />
      <HelperOptions />
      <StoreInfo />
      <DeviceProducts />
      <SpeakerProducts />
      <ServiceInformation />
      <DiscountInfo />
      <Links />
      <Footer />
    </div>
  )
}

export default App
