import DeviceProducts from './DeviceProducts'
import DiscountInfo from './DiscountInfo'
import Footer from './Footer'
import HelperOptions from './HelperOptions'
import Intro from './Intro'
import Links from './Links'
import MegaMenu from './MegaMenu'
import NewProducts from './NewProducts'
import Products from './Products'
import ServiceInformation from './ServiceInformation'
import SpeakerProducts from './SpeakerProducts'
import Statement from './Statement'
import StoreInfo from './StoreInfo'

export default function Home() {
  return (
    <div>
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
  )
}
