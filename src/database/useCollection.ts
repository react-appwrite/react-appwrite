import { Models, Query } from 'appwrite'
import { useContext, useEffect, useMemo } from 'react'
import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'
import type { DocumentData, LoadingResult, RealtimeDocumentOperation } from '../types'
import { createQueryKeyStore } from '@lukemorales/query-key-factory'
import { useAppwrite } from '..'

export function useCollection<T>(
  databaseId: string,
  collectionId: string,
  // queries?: string[],
  options?: UseQueryOptions<(T & Models.Document)[], unknown, (T & Models.Document)[], string[]>
) {
  const { client, database } = useAppwrite()
  const queryClient = useQueryClient()
  const collectionPath = `databases.${databaseId}.collections.${collectionId}`
  const queryKey = useMemo(() => ['appwrite', 'database', databaseId, collectionId], [databaseId, collectionId])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await database.listDocuments<T & Models.Document>(databaseId, collectionId)

      return response.documents
    },

    onSuccess: documents => {
      for (const document of documents) {
        queryClient.setQueryData(['appwrite', 'database', databaseId, collectionId, document.$id], document)
      }
    },

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,

    ...options,
  })

  return queryResult
}