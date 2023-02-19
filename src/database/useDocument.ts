import { Models } from 'appwrite'
import { useContext, useEffect, useMemo } from 'react'
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import type { DocumentData, LoadingResult } from '../types'
import { useAppwrite } from '..'

export function useDocument<T>(
  databaseId: string,
  collectionId: string,
  documentId: string,
  options?: UseQueryOptions<T & Models.Document, unknown, T & Models.Document, string[]>
) {
  const { client, database } = useAppwrite()
  const queryClient = useQueryClient()
  const queryKey = useMemo(() => ['appwrite', 'database', databaseId, collectionId, documentId], [databaseId, collectionId, documentId])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      return await database.getDocument<T & Models.Document>(databaseId, collectionId, documentId)
    },

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,

    ...options,
  })

  useEffect(() => {
    const unsubscribe = client.subscribe(`databases.${databaseId}.collections.${collectionId}.documents.${documentId}`, event => {
      queryClient.setQueriesData(queryKey, event.payload)
    })

    return unsubscribe
  }, [databaseId, collectionId, documentId])

  return queryResult
}