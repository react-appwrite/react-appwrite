import type { Models } from 'appwrite'

export type DatabaseDocumentOperation =
  | 'create'
  | 'update'
  | 'delete'

export type DatabaseDocument<T> = T & Models.Document
export type DatabaseCollection<T> = DatabaseDocument<T>[]