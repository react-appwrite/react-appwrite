'use client'
import './styles.css'
import type { ReactNode } from 'react'
import { AppwriteProvider } from 'react-appwrite-hooks'
import { Client } from 'appwrite'

const appwrite = new Client().setEndpoint('http://localhost/v1')
  .setProject('test')

type Props = {
  children: ReactNode,
}

function MainLayout({ children }: Props) {
  return (
    <html lang="en" style={{
      background: 'black'
    }}>
      <head />

      <body>
        <main>
          <AppwriteProvider
            devTools
            client={appwrite}
          >
            {children}
          </AppwriteProvider>
        </main>
      </body>
    </html>
  )
}

export default MainLayout