import { Account, Client, Databases, Functions } from 'appwrite'
import { createContext, useMemo, type ReactNode } from 'react'
import type { AppwriteContextType } from './types'

// @ts-ignore
export const AppwriteContext = createContext<AppwriteContextType>()

export function AppwriteProvider({ client, children }: { client: Client, children: ReactNode }) {
  const value = useMemo<AppwriteContextType>(() => ({
    client,
    account: new Account(client),
    database: new Databases(client),
    functions: new Functions(client),
  }), [])

  return (
    <AppwriteContext.Provider value={value}>
      {children}
    </AppwriteContext.Provider>
  )
}