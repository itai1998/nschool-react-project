import DeviceProducts from "../components/home/DeviceProducts";
import DiscountInfo from "../components/home/DiscountInfo";
import Footer from "../components/home/Footer";
import HelperOptions from "../components/home/HelperOptions";
import Intro from "../components/home/Intro";
import Links from "../components/home/Links";
import NewProducts from "../components/home/NewProducts";
import Products from "../components/home/Products";
import ServiceInformation from "../components/home/ServiceInformation";
import SpeakerProducts from "../components/home/SpeakerProducts";
import Statement from "../components/home/Statement";
import StoreInfo from "../components/home/StoreInfo";

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
