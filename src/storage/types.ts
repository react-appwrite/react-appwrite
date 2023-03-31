import type { Models } from 'appwrite'

export type StorageFileOperation =
  | 'create'
  | 'update'
  | 'delete'

export type StorageFile<T> = T & Models.File
export type StorageBucket<T> = StorageFile<T>[]