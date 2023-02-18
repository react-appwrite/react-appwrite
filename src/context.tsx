import { Account, Client, Databases, Functions, Storage } from 'appwrite'
import { createContext, useMemo, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppwriteContextType } from './types'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type DevtoolsOptions } from '@tanstack/react-query-devtools/build/lib/devtools'

type Props = {
  client: Client,
  children: ReactNode,
  devTools: boolean | DevtoolsOptions,
}

const queryClient = new QueryClient()

// @ts-ignore
export const AppwriteContext = createContext<AppwriteContextType>()

// export const AppwriteQueryContext: React.Context<QueryClient> = createContext(queryClient)

export function AppwriteProvider({ client, children, devTools }: Props) {
  const value = useMemo<AppwriteContextType>(() => ({
    client,
    account: new Account(client),
    database: new Databases(client),
    functions: new Functions(client),
    storage: new Storage(client),
    health: new Storage(client),
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

        {
          devTools &&
          <ReactQueryDevtools
            {...(typeof devTools === 'boolean' ? {} : devTools)}
          />
        }
      </QueryClientProvider>
    </AppwriteContext.Provider>
  )
}