import { useForm } from "react-hook-form";
import styles from "../scss/ShoppingCart.module.scss";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

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

  const { register, handleSubmit } = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    // Keep UI in sync with Firebase session
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setEmailDisplay(user?.email || undefined);
    });
    return () => unsub();
  }, []);

  const onSubmit = async (data: LoginData) => {
    setErrorMsg(null);
    setLoading(true);
    try {
      // Choose persistence based on Remember Me
      await setPersistence(
        auth,
        data.rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      // Sign in
      const cred = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Optional: get the JWT (ID token) for your backend
      const idToken = await cred.user.getIdToken(); // <-- JWT

      // Log JWT for testing purposes
      console.log("Firebase JWT Token:", idToken);
      console.log(
        "JWT Token (decoded payload):",
        JSON.parse(atob(idToken.split(".")[1]))
      );

      // onAuthStateChanged will flip isLoggedIn; no need to set here
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

  const doLogout = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await signOut(auth);
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
              <input
                {...register("email")}
                type="email"
                placeholder="電子郵件地址"
                autoComplete="username"
              />
              <input
                {...register("password")}
                type="password"
                placeholder="密碼"
                autoComplete="current-password"
              />
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

            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? "處理中…" : "登入"}
            </button>

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
            onClick={doLogout}
            disabled={loading}
          >
            {loading ? "處理中…" : "登出"}
          </button>
        </div>
      )}
    </div>
  );
}
