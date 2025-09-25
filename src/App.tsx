import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss'
import DeviceProducts from './components/DeviceProducts'
import Footer from './components/Footer'
import HelperOptions from './components/HelperOptions'
import Intro from './components/Intro'
import Links from './components/Links'
import NewProducts from './components/NewProducts'
import Products from './components/Products'
import ServiceInformation from './components/ServiceInformation'
import SpeakerProducts from './components/SpeakerProducts'
import StoreInfo from './components/StoreInfo'
import DiscountInfo from './components/DiscountInfo'
import Statement from './components/Statement'
import MegaMenu from './components/MegaMenu'
import Search from './components/Search'
import ShoppingCart from './components/ShoppingCart'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <MegaMenu />
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
              <Statement />
              <Footer />
            </div>
          }
        />
        <Route path="/search" element={<Search />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  )
}

export default App
