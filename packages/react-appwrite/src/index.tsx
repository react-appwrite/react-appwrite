import { type Client, Account, Storage, Teams, Databases, Functions, Messaging, Locale, Avatars, TablesDB, Realtime, type AppwriteException } from 'appwrite'
import { useState, createContext, useContext, type ReactNode } from 'react'
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'

export type AppwriteContext = {
  client: Client,

  account: Account,
  avatars: Avatars,
  databases: Databases,
  functions: Functions,
  locale: Locale,
  messaging: Messaging,
  realtime: Realtime,
  storage: Storage,
  tablesDB: TablesDB,
  teams: Teams,
}

// @ts-expect-error
export const AppwriteContext = createContext<AppwriteContext>(null)

type Props = {
  client: Client,
  children: ReactNode,
}

export function AppwriteProvider({ client, children }: Props) {
  const [context] = useState<AppwriteContext>(() => ({
    client,
    
    account: new Account(client),
    avatars: new Avatars(client),
    databases: new Databases(client),
    functions: new Functions(client),
    locale: new Locale(client),
    messaging: new Messaging(client),
    realtime: new Realtime(client),
    storage: new Storage(client),
    tablesDB: new TablesDB(client),
    teams: new Teams(client),
  }))

  return (
    <AppwriteContext.Provider
      value={context}
    >
      {children}
    </AppwriteContext.Provider>
  )
}

export function useAppwrite() {
  const context = useContext(AppwriteContext)

  if (!context) {
    throw new Error('`useAppwrite()` must be used under `AppwriteProvider`')
  }

  return context
}

export type AppwriteQueryOptions<TData> = Omit<UseQueryOptions<TData, AppwriteException>, 'queryFn' | 'queryKey' | 'select'>

export type AppwriteMutationOptions<TData> = Omit<UseMutationOptions<TData, AppwriteException>, 'mutationFn'>

export type ReactAppwriteQueryOptions = {
  realtime?: boolean,
}