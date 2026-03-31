import DeviceProducts from "../features/home/components/DeviceProducts";
import DiscountInfo from "../features/home/components/DiscountInfo";
import Footer from "../features/home/components/Footer";
import HelperOptions from "../features/home/components/HelperOptions";
import Intro from "../features/home/components/Intro";
import Links from "../features/home/components/Links";
import NewProducts from "../features/home/components/NewProducts";
import Products from "../features/home/components/Products";
import ServiceInformation from "../features/home/components/ServiceInformation";
import SpeakerProducts from "../features/home/components/SpeakerProducts";
import Statement from "../features/home/components/Statement";
import StoreInfo from "../features/home/components/StoreInfo";

export default function Home() {
  return (
    <div>
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
  );
}
