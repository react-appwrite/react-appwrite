'use client'

import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { Models } from 'appwrite'
import produce, { castDraft } from 'immer'
import { useEffect, useMemo } from 'react'
import { useAppwrite } from 'react-appwrite-hooks'
import type { DatabaseCollection, DatabaseDocument } from './types'

export function useDocument<TDocument>(
  databaseId: string,
  collectionId: string,
  documentId: string,
  options?: UseQueryOptions<DatabaseDocument<TDocument>, unknown, DatabaseDocument<TDocument>, string[]>
) {
  const { database } = useAppwrite()
  const queryClient = useQueryClient()
  const queryKey = useMemo(() => ['appwrite', 'database', databaseId, collectionId, documentId], [databaseId, collectionId, documentId])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      return await database.getDocument<DatabaseDocument<TDocument>>(databaseId, collectionId, documentId)
    },

    onSuccess: document => {
      queryClient.setQueriesData<DatabaseCollection<TDocument>>(['appwrite', 'database', collectionId], collection => produce(collection, draft => {
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
  }, [databaseId, collectionId, documentId, queryKey])

  return queryResult
}