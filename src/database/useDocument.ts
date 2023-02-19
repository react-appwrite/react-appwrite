import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { Models } from 'appwrite'
import produce, { castDraft } from 'immer'
import { useEffect, useMemo } from 'react'
import { useAppwrite } from 'react-appwrite-hooks'
import type { Collection, Document } from './types'

export function useDocument<T>(
  databaseId: string,
  collectionId: string,
  documentId: string,
  options?: UseQueryOptions<Document<T>, unknown, Document<T>, string[]>
) {
  const { database } = useAppwrite()
  const queryClient = useQueryClient()
  const queryKey = useMemo(() => ['appwrite', 'database', databaseId, collectionId, documentId], [databaseId, collectionId, documentId])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      return await database.getDocument<Document<T>>(databaseId, collectionId, documentId)
    },

    onSuccess: document => {
      queryClient.setQueryData<Collection<T>>(['appwrite', 'database', collectionId], collection => produce(collection, draft => {
        if (draft) {
          const documentIndex = draft.findIndex(storedDocument => storedDocument.$id === document.$id)

          if (documentIndex >= 0) {
            draft[documentIndex] = castDraft(document)
          }
        }
      }))
    },

    ...options,
  })

  useEffect(() => {
    const unsubscribe = database.client.subscribe(`databases.${databaseId}.collections.${collectionId}.documents.${documentId}`, response => {
      queryClient.setQueriesData(queryKey, response.payload)
    })

    return unsubscribe
  }, [queryKey])

  return queryResult
}