import './App.scss'
import Footer from './components/Footer'
import HelperOptions from './components/HelperOptions'
import Intro from './components/Intro'
import Links from './components/Links'
import NavBar from './components/NavBar'
import NewProducts from './components/NewProducts'
import Products from './components/Products'
import StoreCard from './components/StoreCard'
import laptopIcon from './img/storeIcon/laptop.png'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Intro />
      <Products />
      <NewProducts />
      <HelperOptions />
      <StoreCard
        img={laptopIcon}
        text={
          <h3>
            <span style={{ color: '#2787FF' }}>以你現有的裝置換購新產翸，</span>
            獲享折抵優惠。
          </h3>
        }
      />
      <Links />
      <Footer />
    </div>
  )
}

export default App
