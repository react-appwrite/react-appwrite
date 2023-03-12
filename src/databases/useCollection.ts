'use client'

import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'
import { Models } from 'appwrite'
import produce, { castDraft, current } from 'immer'
import { useEffect, useMemo } from 'react'
import { useAppwrite } from 'react-appwrite'
import type { RealtimeDocumentOperation, DatabaseDocument, DatabaseCollection } from 'react-appwrite/databases/types'

export function useCollection<TDocument>(
  databaseId: string,
  collectionId: string,
  queries: string[] = [],
  options?: UseQueryOptions<(TDocument & Models.Document)[], unknown, (TDocument & Models.Document)[], (string | string[])[]>
) {
  const { databases } = useAppwrite()
  const queryClient = useQueryClient()
  const queryKey = useMemo(() => ['appwrite', 'database', databaseId, collectionId, queries], [databaseId, collectionId, queries])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await databases.listDocuments<DatabaseDocument<TDocument>>(databaseId, collectionId, queries)

      return response.documents
    },

    onSuccess: documents => {
      for (const document of documents) {
        queryClient.setQueryData(['appwrite', 'database', databaseId, collectionId, document.$id], document)
      }
    },

    ...options,
  })

  useEffect(() => {
    const unsubscribe = databases.client.subscribe(`databases.${databaseId}.collections.${collectionId}.documents`, response => {
      const [, operation] = response.events[0].match(/\.(\w+)$/) as RegExpMatchArray
      const document = response.payload as DatabaseDocument<TDocument>

      switch (operation as RealtimeDocumentOperation) {
        case 'create':
        case 'update':
          queryClient.setQueryData(['appwrite', 'database', databaseId, collectionId, document.$id], document)

          queryClient.setQueryData<DatabaseCollection<TDocument>>(queryKey, collection => produce(collection, draft => {
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

          queryClient.setQueryData<DatabaseCollection<TDocument>>(queryKey, collection => {
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