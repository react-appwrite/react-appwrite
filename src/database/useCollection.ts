'use client'

import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'
import { Models } from 'appwrite'
import produce, { castDraft, current } from 'immer'
import { useEffect, useMemo } from 'react'
import { useAppwrite } from 'react-appwrite-hooks'
import type { RealtimeDocumentOperation, Document, Collection } from 'react-appwrite-hooks/database/types'

export function useCollection<T>(
  databaseId: string,
  collectionId: string,
  // queries?: string[],
  options?: UseQueryOptions<Document<T>[], unknown, Document<T>[], string[]>
) {
  const { database } = useAppwrite()
  const queryClient = useQueryClient()
  const queryKey = useMemo(() => ['appwrite', 'database', databaseId, collectionId], [databaseId, collectionId])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await database.listDocuments<Document<T>>(databaseId, collectionId)

      return response.documents
    },

    onSuccess: documents => {
      for (const document of documents) {
        queryClient.setQueryData(['appwrite', 'database', databaseId, collectionId, document.$id], document)

        queryClient.setQueryData<Collection<T>>(queryKey, collection => produce(collection, draft => {
          if (collection && draft) {
            const documentIndex = draft.findIndex(storedDocument => storedDocument.$id === document.$id)

            if (documentIndex >= 0) {
              draft[documentIndex] = castDraft(document)
            }
          }
        }))
      }
    },

    ...options,
  })

  useEffect(() => {
    const unsubscribe = database.client.subscribe(`databases.${databaseId}.collections.${collectionId}.documents`, response => {
      const [, operation] = response.events[0].match(/\.(\w+)$/) as RegExpMatchArray
      const document = response.payload as Document<T>

      switch (operation as RealtimeDocumentOperation) {
        case 'create':
        case 'update':
          queryClient.setQueryData(['appwrite', 'database', databaseId, collectionId, document.$id], document)

          queryClient.setQueryData<Collection<T>>(queryKey, collection => produce(collection, draft => {
            if (collection && draft) {
              const documentIndex = draft.findIndex(storedDocument => storedDocument.$id === document.$id)

              if (documentIndex >= 0) {
                draft[documentIndex] = castDraft(document)
              }
            }
          }))

          break
        case 'delete':
          queryClient.removeQueries(['appwrite', 'database', databaseId, collectionId, document.$id])

          queryClient.setQueryData<Collection<T>>(queryKey, collection => {
            if (collection) {
              return collection.filter(storedDocument => storedDocument.$id !== document.$id)
            }

            return collection
          })

          break
      }
    })

    return unsubscribe
  }, [queryKey])

  return queryResult
}