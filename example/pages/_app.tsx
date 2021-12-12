import '../index.css'
import Head from 'next/head'
import Footer from '../components/Footer'
import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title></title>
        {/* <base href="/" target="_blank"></base> */}
        <meta name="description" content="" />
        <meta name="theme-color" content="" />
      </Head>

      <Component {...pageProps} />
      <Footer />
    </>
  )
}