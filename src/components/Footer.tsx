import '../scss/Footer.scss'
import AppleList from './AppleList'
import {
  productList,
  wallet,
  account,
  entertainment,
  appleStore,
  forBusiness,
  education,
  appleValues,
  aboutApple,
} from './lists/helperList'

export default function Footer() {
  return (
    <div className="footerContainer">
      <div className="listContainer">
        <AppleList listTitle="選購與了解產品" list={productList} />
        <AppleList listTitle="Apple 錢包" list={wallet} />
      </div>
      <div className="listContainer">
        <AppleList listTitle="帳號" list={account} />
        <AppleList listTitle="娛樂" list={entertainment} />
      </div>
      <div className="listContainer">
        <AppleList listTitle="Apple Store" list={appleStore} />
      </div>
      <div className="listContainer">
        <AppleList listTitle="商務應用" list={forBusiness} />
        <AppleList listTitle="教育應用" list={education} />
      </div>
      <div className="listContainer">
        <AppleList listTitle="Apple 價值" list={appleValues} />
        <AppleList listTitle="關於 Apple" list={aboutApple} />
      </div>
    </div>
  )
}
