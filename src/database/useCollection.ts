import type { Appwrite, Models } from 'appwrite/types/sdk'
import type { AsyncEffectResult, Loading } from '../types'
import { useEffect, useState } from 'react'

export type Collection<Model> = Array<Model & Models.Document>
export type UseCollectionResult<Model> = AsyncEffectResult<Collection<Model>>
export type CollectionOptions = {
  filters?: string[],
  limit?: number,
  offset?: number,
  orderField?: string,
  orderType?: string,
  orderCast?: string,
  search?: string,
}

export default function useCollection<Model>(
  appwrite: Appwrite,
  collectionId: string,
  options?: CollectionOptions | undefined): UseCollectionResult<Model> {

  const [collection, setCollection] = useState<Loading<Collection<Model>>>()
  const [error, setError] = useState<unknown>()

  useEffect(() => {
    appwrite
      .database
      .listDocuments(collectionId,
        options?.filters,
        options?.limit,
        options?.offset,
        options?.orderField,
        options?.orderType,
        options?.orderCast,
        options?.search,
      )
      .then(collection => setCollection(collection.documents as Collection<Model>))
      .catch(setError)
  }, [collectionId, options])

  useEffect(() => {
    if (collection) {
      return appwrite.subscribe(collection.map(doc => `documents.${doc.$id}`), e => {
        const payload = e.payload as Model & Models.Document

        switch (e.event) {
          case 'database.documents.delete':
            setCollection(collection?.filter(doc => doc.$id !== payload.$id))
            break
          case 'database.documents.update':
            if (collection) {
              const documentIndex = collection.findIndex(doc => doc.$id === payload.$id)
              const newCollection = [...collection]

              newCollection[documentIndex] = payload

              setCollection(newCollection)
            }

            break
          case 'database.documents.create':
            // if (collection) {
            //   setCollection([...collection, payload])
            // }
            break
          default:
            break
        }
      })
    }

    return () => undefined
  }, [collection])

  console.log('Collection', collection)

  return [collection, collection === undefined && error !== undefined, error]
}