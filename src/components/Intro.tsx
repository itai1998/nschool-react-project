import styles from '../scss/Intro.module.scss'
import avatar from '../img/avatar.jpg'
import contactIcon from '../img/communication.png'

export default function Intro() {
  return (
    <div className={styles.introContainer}>
      <div className={styles.favorites}>
        <h1>
          <span>商店。</span> 購買你喜愛的產品，
          <br />
          這是最好的方式。
        </h1>
      </div>
      <div className={styles.contactContainer}>
        <div className={styles.contactCard}>
          <img src={avatar} alt="avatar" />
          <div className={`${styles.contact} ${styles.left}`}>
            <h5>需要購物協助嗎？</h5>
            <h5>洽詢專員</h5>
          </div>
        </div>
        <div className={styles.contactCard}>
          <img src={contactIcon} alt="contactIcon" />
          <div className={styles.contact}>
            <h5>前往 Apple 直營店</h5>
            <h5>尋找附近的直營店</h5>
          </div>
        </div>
      </div>
    </div>
  )
}
