import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
      if (router.pathname === '/admin-dashboard' && !isAuthenticated) {
        router.push('/admin-login')
      }
    }

    checkAuth()

    // Listen for route changes
    router.events.on('routeChangeComplete', checkAuth)

    // Clean up the event listener
    return () => {
      router.events.off('routeChangeComplete', checkAuth)
    }
  }, [router])

  return <Component {...pageProps} />
}

export default MyApp