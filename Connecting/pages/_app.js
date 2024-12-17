import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Cookies from "js-cookie";
import { useRouter } from "next/router"; // Add this import
import { Auth } from "../Components/index.js";

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(false);
  const router = useRouter(); // Get the current router

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  // Add this condition to prevent Auth from showing on reset-password page
  const shouldShowAuth =
    !auth &&
    router.pathname !== "/reset-password" &&
    router.pathname !== "/forgot-password";

  return (
    <>
      <Head>
        <title>HAHO AI Image </title>
        <meta
          name="description"
          content="AI Image Generator powered by OpenAI"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="180x180"
          href="/assets/Brain_tech.png"
        />
      </Head>
      {shouldShowAuth && <Auth />}
      <Component {...pageProps} />
    </>
  );
}
