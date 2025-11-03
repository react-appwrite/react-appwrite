import { type Client, Account, Storage, Teams, Databases, Functions, Messaging, Locale, Avatars } from 'appwrite'
import { useState, createContext, useContext, type ReactNode } from 'react'

export type AppwriteContext = {
  client: Client,

  account: Account,
  avatars: Avatars,
  databases: Databases,
  functions: Functions,
  locale: Locale,
  messaging: Messaging,
  storage: Storage,
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
    storage: new Storage(client),
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
  return useContext(AppwriteContext)
}