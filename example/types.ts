import type { DatabaseDocument } from 'react-appwrite/databases'

export type User = {
  avatar?: string,
  name: string,
}

export type Article = DatabaseDocument<{
  title: string,
  content: string,
  published: boolean,
}>

export type Comment = DatabaseDocument<{
  content: string,
  name: string,
  avatar?: string,
  articleId: string,
}>