import styles from '../../scss/Links.module.scss'

export default function Links() {
  return (
    <div className={styles.linksWrapper}>
      <div className={styles.linksContainer}>
        <h2>快速連結</h2>
        <div className={styles.links}>
          <button>尋找商店</button>
          <button>訂單狀態</button>
          <button>購物協助</button>
          <button>你的收藏</button>
        </div>
      </div>
    </div>
  )
}
