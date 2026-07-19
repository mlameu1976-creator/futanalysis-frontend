import "../../styles/opportunities.css"
import Head from "next/head"
import Script from "next/script"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import NotificationPrompt from "../components/NotificationPrompt"

const INACTIVITY_LIMIT = 60 * 60 * 1000
const PUBLIC_PAGES = ["/login", "/register", "/privacidade"]

const HIDE_BANNER_PAGES = ["/login", "/register", "/performance", "/dashboard", "/privacidade", "/sobre", "/termos", "/blog"]

function shouldHideBanner(pathname) {
  return HIDE_BANNER_PAGES.some(page => pathname === page || pathname.startsWith(page + "/"))
}

function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("email")
  localStorage.removeItem("last_activity")
  document.cookie = "token=; path=/; max-age=0"
}

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(reg => console.log('SW registrado:', reg.scope))
        .catch(err => console.log('SW erro:', err))
    }
  }, [])

  useEffect(() => {
    if (PUBLIC_PAGES.includes(router.pathname)) return
    const token = localStorage.getItem("token")
    if (!token) return
    const last = parseInt(localStorage.getItem("last_activity") || "0")
    const now = Date.now()
    if (last && now - last > INACTIVITY_LIMIT) {
      logout()
      router.push("/login")
      return
    }
    localStorage.setItem("last_activity", now.toString())
    const updateActivity = () => localStorage.setItem("last_activity", Date.now().toString())
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"]
    events.forEach(e => window.addEventListener(e, updateActivity, { passive: true }))
    const interval = setInterval(() => {
      const token = localStorage.getItem("token")
      if (!token) { clearInterval(interval); return }
      const last = parseInt(localStorage.getItem("last_activity") || "0")
      if (last && Date.now() - last > INACTIVITY_LIMIT) {
        logout(); router.push("/login"); clearInterval(interval)
      }
    }, 60 * 1000)
    return () => {
      events.forEach(e => window.removeEventListener(e, updateActivity))
      clearInterval(interval)
    }
  }, [router.pathname])

  const [bannerHtml, setBannerHtml] = useState("")
  useEffect(() => {
    if (shouldHideBanner(router.pathname)) {
      setBannerHtml("")
      return
    }
    fetch("/api/banner")
      .then((res) => res.json())
      .then((data) => { if (data.html) setBannerHtml(data.html) })
      .catch((err) => console.error("Banner erro:", err));
  }, [router.pathname])

  const showBanner = bannerHtml && !shouldHideBanner(router.pathname)

  return (
    <>
      {showBanner && (
        <div
          style={{ background: "#1a1a2e", textAlign: "center", padding: "8px 0", minHeight: "70px" }}
          dangerouslySetInnerHTML={{ __html: bannerHtml }}
        />
      )}
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="FutAnalysis - Analise inteligente de futebol com probabilidades calculadas por IA. Oportunidades de apostas em 110 ligas do mundo todo." />
        <meta name="keywords" content="futebol, apostas, analise, probabilidades, dicas, over 2.5, btts, oportunidades, futebol ao vivo" />
        <meta name="author" content="FutAnalysis" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://futanalysis.com.br" />
        <meta property="og:title" content="FutAnalysis - Analise Inteligente de Futebol" />
        <meta property="og:description" content="Probabilidades calculadas por IA em 110 ligas. Oportunidades de Over/Under, BTTS, resultado e muito mais." />
        <meta property="og:image" content="https://futanalysis.com.br/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FutAnalysis - Analise Inteligente de Futebol" />
        <meta name="twitter:description" content="Probabilidades calculadas por IA em 110 ligas do mundo todo." />
        <meta name="google-site-verification" content="XQ0gqTq2UVEZIQUZl5-Du5mE9rT6xeILnhL_Vb2Nr18" />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F5C518" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FutAnalysis" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-RK4G1H5QWH"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RK4G1H5QWH');
        `}} />

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9895267135709198" crossOrigin="anonymous"></script>
      </Head>
      <Script id="ms-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "x94zztmrz3");
        `}
      </Script>

      <Component {...pageProps} />
      <NotificationPrompt />
    </>
  )
}
