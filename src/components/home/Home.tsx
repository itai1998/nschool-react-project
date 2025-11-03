import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userSlice from "../../store/userSlice";
import DeviceProducts from "./DeviceProducts";
import DiscountInfo from "./DiscountInfo";
import Footer from "./Footer";
import HelperOptions from "./HelperOptions";
import Intro from "./Intro";
import Links from "./Links";
import NewProducts from "./NewProducts";
import Products from "./Products";
import ServiceInformation from "./ServiceInformation";
import SpeakerProducts from "./SpeakerProducts";
import Statement from "./Statement";
import StoreInfo from "./StoreInfo";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default function Home() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
