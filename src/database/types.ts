import type { Models } from 'appwrite'

export type RealtimeDocumentOperation =
  | 'create'
  | 'update'
  | 'delete'

export type Document<T> = T & Models.Document
export type Collection<T> = Document<T>[]