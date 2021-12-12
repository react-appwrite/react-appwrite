import type { Appwrite, Models } from 'appwrite/types/sdk'
import type { AsyncEffectResult } from '../types'
import { useAsyncResult } from '../util'

export type Document<Model> = Model & Models.Document
export type UseDocumentResult<Model> = AsyncEffectResult<Document<Model>>

export default function useDocument<Model>(appwrite: Appwrite, collectionId: string, documentId: string): UseDocumentResult<Model> {
  return useAsyncResult<Document<Model>>((set, error) => {
    appwrite
      .database
      .getDocument(collectionId, documentId)
      // @ts-ignore
      .then(set)
      .catch(error)

    return appwrite.subscribe(`documents.${documentId}`, e => {
      set(e.payload as Document<Model>)
    })
  })
}