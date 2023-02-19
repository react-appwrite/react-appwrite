import { Account, Avatars, Client, Databases, Functions, Storage, Teams } from 'appwrite'
import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppwriteContextType } from './types'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type DevtoolsOptions } from '@tanstack/react-query-devtools/build/lib/devtools'

type Props = {
  client: Client,
  children: ReactNode,
  devTools: boolean | DevtoolsOptions,
  queryClient?: QueryClient,
}

const queryClient = new QueryClient()

// @ts-ignore
export const AppwriteContext = createContext<AppwriteContextType>()
export const useAppwrite = () => useContext(AppwriteContext)

export function AppwriteProvider({ client, children, devTools, ...props }: Props) {
  const value = useMemo<AppwriteContextType>(() => ({
    client,
    account: new Account(client),
    database: new Databases(client),
    functions: new Functions(client),
    storage: new Storage(client),
    health: new Storage(client),
    avatars: new Avatars(client),
    teams: new Teams(client),
  }), [])

  return (
    <AppwriteContext.Provider
      value={value}
    >
      <QueryClientProvider
        // context={AppwriteQueryContext}
        client={props.queryClient || queryClient}
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

export * from './account'
export * from './database'
export * from './functions'
export * from './storage'
export * from './avatars'
export * from './teams'