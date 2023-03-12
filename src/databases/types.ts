import type { Models } from 'appwrite'

export type RealtimeDocumentOperation =
  | 'create'
  | 'update'
  | 'delete'

export type DatabaseDocument<T> = T & Models.Document
export type DatabaseCollection<T> = DatabaseDocument<T>[]