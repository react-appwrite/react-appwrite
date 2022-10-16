import type { AppProps as Props } from 'next/app'
import { Client } from 'appwrite'

import '../index.css'
import Head from 'next/head'
import Footer from '../components/Footer'
import MainLayout from '../components/MainLayout'
import { AppwriteProvider } from 'react-appwrite-hooks'

const appwriteClient = new Client()
  .setEndpoint('http://localhost/v1')
  .setProject('test')

export default function App({ Component, pageProps }: Props) {
  return (
    <>
      <Head>
        <title></title>
        {/* <base href="/" target="_blank"></base> */}
        <meta name="description" content="" />
        <meta name="theme-color" content="" />
      </Head>

      <AppwriteProvider
        client={appwriteClient}
      >
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AppwriteProvider>

      <Footer />
    </>
  )
}