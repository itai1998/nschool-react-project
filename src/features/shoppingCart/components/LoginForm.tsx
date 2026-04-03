import { useState } from "react";
import styles from "../../../scss/loginForm.module.scss";
import { useForm } from "react-hook-form";
import arrowRightIcon from "../../../img/icons/arrow-right.png";
import loadingIcon from "../../../img/icons/load.png";

interface LoginFormProps {
  isLoggedIn: boolean;
  errorMsg: string | null;
  loading: boolean;
  emailDisplay: string | undefined;
  onSubmit: (data: LoginData) => void;
  onLogout: () => void;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm({
  isLoggedIn,
  errorMsg,
  loading,
  emailDisplay,
  onSubmit,
  onLogout,
}: LoginFormProps) {
  const [isEmailExists, setIsEmailExists] = useState(false);
  const { register, handleSubmit, watch } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  return (
    <div>
      {!isLoggedIn && (
        <div className={styles.loginContainer}>
          <h2>登入 Apple Store</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputContainer}>
              <div className={styles.inputWrapper}>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="電子郵件地址"
                  autoComplete="username"
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      !isEmailExists &&
                      watch("email").length > 0
                    ) {
                      e.preventDefault();
                      setIsEmailExists(true);
                    }
                  }}
                />
                {!isEmailExists && (
                  <button type="button" onClick={() => setIsEmailExists(true)}>
                    <img src={arrowRightIcon} alt="submitArrow" />
                  </button>
                )}
              </div>

              {isEmailExists && <div className={styles.inputDivider} />}
              {isEmailExists && (
                <div className={styles.inputWrapper}>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="密碼"
                    autoComplete="current-password"
                  />
                  <button type="submit" disabled={loading}>
                    {loading ? (
                      <img src={loadingIcon} alt="loading" />
                    ) : (
                      <img src={arrowRightIcon} alt="submitArrow" />
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className={styles.checkboxContainer}>
              <input
                id="remember"
                {...register("rememberMe")}
                type="checkbox"
              />
              <label htmlFor="remember">
                <h4>記住我的帳號</h4>
              </label>
            </div>

            {errorMsg && <p className={styles.error}>{errorMsg}</p>}
          </form>
        </div>
      )}

      {isLoggedIn && (
        <div className={styles.loggedInContainer}>
          <h2>已登入</h2>
          {emailDisplay && <p>{emailDisplay}</p>}
          <button
            type="button"
            className={styles.logoutButton}
            onClick={onLogout}
            disabled={loading}
          >
            {loading ? "處理中…" : "登出"}
          </button>
        </div>
      )}
    </div>
  );
}
