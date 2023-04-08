import { QueryClient } from '@tanstack/react-query'
import { Client } from 'appwrite'
import type { ReactNode } from 'react'
import { AppwriteProvider } from 'react-appwrite'

export const createWrapper = () => {
  return ({ children }: { children: ReactNode }) => {
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_URL as string)
      .setProject(process.env.APPWRITE_PROJECT_ID as string)

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })

    return (
      <AppwriteProvider
        client={client}
        queryClient={queryClient}
        devTools={false}
      >
        {children}
      </AppwriteProvider>
    )
  }
}