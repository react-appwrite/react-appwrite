import type { Account, Avatars, Client, Databases, Functions, Models, Storage, Teams } from 'appwrite/types'

export type Nullable<T> = T | null | undefined

export type LoadingResult<T> = [Nullable<T>, Nullable<boolean>, Nullable<string | Error>]
export type LoadingAction<T> =
  | { type: 'success', data: T }
  | { type: 'update', data: T }
  | { type: 'error', error: string | Error }
  | { type: 'loading', state: boolean }

export type AppwriteContextType = {
  client: Client,
  account: Account,
  database: Databases,
  functions: Functions,
  storage: Storage,
  avatars: Avatars,
  teams: Teams,
}

export type DocumentData<T> = T & Models.Document
export type ExecutionData<T> = Models.Execution & {
  data: Nullable<T>,
}

export type RealtimeDocumentOperation =
  | 'create'
  | 'update'
  | 'delete'

export type AppwriteFunction<Request, Response> = [(request: Request) => Promise<ExecutionData<Response>>, Nullable<ExecutionData<Response>>]