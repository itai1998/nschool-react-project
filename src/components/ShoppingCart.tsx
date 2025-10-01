import styles from "../scss/ShoppingCart.module.scss";

export default function ShoppingCart() {
  return (
    <div className={styles.shoppingCartContainer}>
      <h1>登入以加快結帳速度。</h1>
      <div className={styles.loginContainer}>
        <h2>登入 Apple Store</h2>
        <form>
          <div className={styles.inputContainer}>
            <input type="text" placeholder="電子郵件地址或電話號碼" />
            <input type="password" placeholder="密碼" />
          </div>

          <div className={styles.checkboxContainer}>
            <input type="checkbox" />
            <h4>記住我的帳號</h4>
          </div>
          <button type="submit" className={styles.loginButton}>
            登入
          </button>
        </form>
      </div>
    </div>
  );
}
