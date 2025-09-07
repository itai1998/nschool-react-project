import laptopIcon from '../../img/storeIcon/laptop.png'
import creditCardIcon from '../../img/storeIcon/creditCard.png'
import happyIcon from '../../img/storeIcon/happyFace.png'
import deliveryIcon from '../../img/storeIcon/deliveryTruck.png'
import shoppingIcon from '../../img/storeIcon/shoppingBag.png'
import appleIcon from '../../img/storeIcon/apple.png'

export const storeInfoList = [
  {
    img: laptopIcon,
    text: (
      <h3>
        <span style={{ color: '#2787FF' }}>以你現有的裝置換購新產翸，</span>
        獲享折抵優惠。
      </h3>
    ),
  },
  {
    img: creditCardIcon,
    text: <h3>零利率分期付款，最長可達 12 個月。</h3>,
  },
  {
    img: happyIcon,
    text: (
      <h3>
        由你訂製，專屬於你。
        <span style={{ color: '#2787FF' }}>
          表情符號、名稱、暱稱文字與數字可混搭鐫刻，免額外付費。
        </span>
      </h3>
    ),
  },
  {
    img: deliveryIcon,
    text: <h3>可享免額外付費的運送服務，或前往 Apple 直營店提取或商品。</h3>,
  },
  {
    img: shoppingIcon,
    text: (
      <h3>
        <span style={{ color: '#2787FF' }}>Apple Store App </span>為你帶來
        <span style={{ color: '#2787FF' }}>個人化的選購體驗。</span>
      </h3>
    ),
  },
  {
    img: appleIcon,
    text: (
      <h3>
        <span style={{ color: '#2787FF' }}>訂製</span>
        你的 Mac 並打造專屬的 Apple Watch 錶款。
      </h3>
    ),
  },
]
