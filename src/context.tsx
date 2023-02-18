import { Account, Client, Databases, Functions } from 'appwrite'
import { createContext, useMemo, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppwriteContextType } from './types'

const queryClient = new QueryClient()

// @ts-ignore
export const AppwriteContext = createContext<AppwriteContextType>()

// export const AppwriteQueryContext: React.Context<QueryClient> = createContext(queryClient)

export function AppwriteProvider({ client, children }: { client: Client, children: ReactNode }) {
  const value = useMemo<AppwriteContextType>(() => ({
    client,
    account: new Account(client),
    database: new Databases(client),
    functions: new Functions(client),
  }), [])

  return (
    <AppwriteContext.Provider
      value={value}
    >
      <QueryClientProvider
        // context={AppwriteQueryContext}
        client={queryClient}
      >
        {children}
      </QueryClientProvider>
    </AppwriteContext.Provider>
  )
}