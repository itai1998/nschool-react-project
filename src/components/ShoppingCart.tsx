import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Cookies from "js-cookie";
import styles from "../scss/ShoppingCart.module.scss";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import arrowRightIcon from "../img/icons/arrow-right.png";
import loadingIcon from "../img/icons/load.png";
import {
  signInWithEmailAndPassword,
  // onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { setLogin, setLogout, setToken } from "../store/userSlice";

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function ShoppingCart() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailDisplay, setEmailDisplay] = useState<string | undefined>(
    undefined
  );
  const [isEmailExists, setIsEmailExists] = useState(false);

  const dispatch = useAppDispatch();
  const tokenRedux = useAppSelector((state) => state.user.profile.token);

  const { register, handleSubmit } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    console.log("tokenRedux", tokenRedux);
    const token = Cookies.get("token");
    if (token) {
      try {
        // Decode JWT token to get email
        const payload = JSON.parse(atob(token.split(".")[1]));
        setIsLoggedIn(true);
        setEmailDisplay(payload.email);

        // Restore Redux state from cookie
        dispatch(
          setLogin({
            email: payload.email,
            rememberMe: true, // If token exists in cookie, user chose to be remembered
            loggedIn: true,
            token: token,
          })
        );
      } catch (error) {
        console.error("Failed to decode token:", error);
        Cookies.remove("token");
        dispatch(setLogout());
      }
    }
  }, [dispatch, tokenRedux]);

  const onSubmit = async (data: LoginData) => {
    setErrorMsg(null);
    setLoading(true);
    try {
      // Sign in
      const cred = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      setIsLoggedIn(true);
      setEmailDisplay(cred.user.email || undefined);
      const token = await cred.user.getIdToken();
      dispatch(setToken(token));
      Cookies.set("token", token);

      dispatch(
        setLogin({
          email: data.email,
          rememberMe: data.rememberMe,
          loggedIn: true,
          token: token,
        })
      );
    } catch (err: any) {
      // Friendly messages for common cases
      const code = err?.code as string | undefined;
      const map: Record<string, string> = {
        "auth/invalid-credential": "帳號或密碼錯誤。",
        "auth/invalid-email": "電子郵件格式不正確。",
        "auth/user-disabled": "此帳號已被停用。",
        "auth/user-not-found": "找不到此帳號。",
        "auth/wrong-password": "密碼錯誤。",
        "auth/too-many-requests": "嘗試次數過多，請稍後再試。",
      };
      setErrorMsg(map[code || ""] || "登入失敗，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await signOut(auth);
      Cookies.remove("token");
      setIsLoggedIn(false);
      setEmailDisplay("");
      dispatch(setLogout());
    } catch {
      setErrorMsg("登出失敗，請稍後再試。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.shoppingCartContainer}>
      <h1>登入以加快結帳速度。</h1>

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
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? "處理中…" : "登出"}
          </button>
        </div>
      )}
    </div>
  );
}
