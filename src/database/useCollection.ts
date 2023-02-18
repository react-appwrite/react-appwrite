import { Models, Query } from 'appwrite'
import { useContext, useEffect, useMemo } from 'react'
import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'
import { AppwriteContext } from '../context'
import type { DocumentData, LoadingResult, RealtimeDocumentOperation } from '../types'
import { createQueryKeyStore } from '@lukemorales/query-key-factory'

export function useCollection<T>(
  databaseId: string,
  collectionId: string,
  // queries?: string[],
  options?: UseQueryOptions<(T & Models.Document)[], unknown, (T & Models.Document)[], string[]>
) {
  const { client, database } = useContext(AppwriteContext)
  const collectionPath = `databases.${databaseId}.collections.${collectionId}`
  const queryKey = useMemo(() => ['appwrite', 'documents', databaseId, collectionId], [databaseId, collectionId])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await database.listDocuments<T & Models.Document>(databaseId, collectionId)

      return response.documents
    },

    ...options,
  })

  return queryResult
}