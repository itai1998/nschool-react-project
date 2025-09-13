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
      <div className="footerTableContainer">
        <div></div>
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
      <div className="copyrightContainer">
        <div className="copyrightContact">
          <p>
            更多選購方式：尋找當地的 Apple
            直營店或其他零售商，或致電0800-020-021。
          </p>
        </div>
        <div className="copyrightBottom">
          <div className="copyright">
            <p>Copyright © 2025 Apple Inc. 保留一切權利。</p>
            <div className="copyrightList">
              <p>隱私權政策</p>
              <p>使用條款</p>
              <p>銷售及退款</p>
              <p>網站地圖</p>
            </div>
          </div>
          <div>
            <p>台灣</p>
          </div>
        </div>
      </div>
    </div>
  )
}
