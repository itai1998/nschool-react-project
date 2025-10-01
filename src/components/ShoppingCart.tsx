import { useForm } from "react-hook-form";
import styles from "../scss/ShoppingCart.module.scss";

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function ShoppingCart() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginData) => {
    console.log(data);
  };

  return (
    <div className={styles.shoppingCartContainer}>
      <h1>登入以加快結帳速度。</h1>
      <div className={styles.loginContainer}>
        <h2>登入 Apple Store</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <input
              {...register("email")}
              type="text"
              placeholder="電子郵件地址或電話號碼"
            />
            <input
              {...register("password")}
              type="password"
              placeholder="密碼"
            />
          </div>

          <div className={styles.checkboxContainer}>
            <input {...register("rememberMe")} type="checkbox" />
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
