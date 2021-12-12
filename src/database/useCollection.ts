import type { Appwrite, Models } from 'appwrite/types/sdk'
import type { AsyncEffectResult } from '../types'
import { useAsyncResult } from '../util'

export type Collection<Model> = Models.DocumentList<Model & Models.Document>
export type UseCollectionResult<Model> = AsyncEffectResult<Omit<Collection<Model>, 'sum'>>

export default function useCollection<Model>(appwrite: Appwrite, collectionId: string): UseCollectionResult<Model> {
  return useAsyncResult<Collection<Model>>((set, error, data) => {
    appwrite
      .database
      .listDocuments(collectionId)
      // @ts-ignore
      .then(set)
      .catch(error)

    return appwrite.subscribe(`collections.${collectionId}.documents`, e => {
      switch (e.event) {
        case 'database.documents.delete':
          // @ts-ignore
          set({ ...data, documents: data?.documents.filter(document => document.$id !== e.payload.$id) } as Collection<Model>)
          break
        default:
          break
      }

      console.log('EEEEE', e)
      set(e.payload as Collection<Model>)
    })
  })
}