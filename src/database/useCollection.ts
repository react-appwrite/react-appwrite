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

  const fullUpdate = () => {
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
  }

  useEffect(fullUpdate, [collectionId, options])

  useEffect(() => {
    const destructor = appwrite.subscribe([...(collection || []).map(doc => `documents.${doc.$id}`)], e => {
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
        default:
          break
      }
    })

    // This is very ineffecient, but will do for now.
    const creationDestructor = appwrite.subscribe(`collections.${collectionId}.documents`, e => {
      if (e.event === 'database.documents.create') {
        fullUpdate()
      }
    })

    return () => {
      destructor()
      creationDestructor()
    }
  }, [collection])

  console.log('Collection', collection)

  return [collection, collection === undefined && error !== undefined, error]
}