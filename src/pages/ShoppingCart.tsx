import { useAppDispatch, useAppSelector } from "../store/hooks";
import Cookies from "js-cookie";
import styles from "../scss/ShoppingCart.module.scss";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setLogin, setLogout, setToken } from "../store/userSlice";
import ShippingCartItem from "../features/shoppingCart/components/ShippingCartItem";
import LoginForm, { type LoginData } from "../features/shoppingCart/components/LoginForm";

export default function ShoppingCart() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailDisplay, setEmailDisplay] = useState<string | undefined>(
    undefined
  );

  const dispatch = useAppDispatch();
  const tokenRedux = useAppSelector((state) => state.user.profile.token);

  useEffect(() => {
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

      <LoginForm
        isLoggedIn={isLoggedIn}
        errorMsg={errorMsg}
        loading={loading}
        emailDisplay={emailDisplay}
        onSubmit={onSubmit}
        onLogout={handleLogout}
      />
      <ShippingCartItem />
    </div>
  );
}
