import styles from '../scss/NavBar.module.scss'
import appleLogo from '../img/apple-logo.png'
import searchIcon from '../img/search-interface-symbol.png'
import marketIcon from '../img/market.png'

export default function NavBar() {
  const navOptions = [
    { type: 'icon', src: appleLogo, alt: 'Apple Logo' },
    { type: 'text', content: '商店' },
    { type: 'text', content: 'Mac' },
    { type: 'text', content: 'iPad' },
    { type: 'text', content: 'iPhone' },
    { type: 'text', content: 'Watch' },
    { type: 'text', content: 'Vision' },
    { type: 'text', content: 'AirPods' },
    { type: 'text', content: 'TV 和家庭' },
    { type: 'text', content: '娛樂' },
    { type: 'text', content: '配件' },
    { type: 'text', content: '支援服務' },
    { type: 'icon', src: searchIcon, alt: 'Search' },
    { type: 'icon', src: marketIcon, alt: 'Market' },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.iconContain}>
        {navOptions.map((item, idx) =>
          item.type === 'icon' ? (
            <img key={idx} src={item.src} alt={item.alt} />
          ) : (
            <span key={idx}>{item.content}</span>
          )
        )}
      </div>
    </div>
  )
}
