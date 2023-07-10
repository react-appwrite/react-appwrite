'use client'

import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useEffect, useMemo } from 'react'
import { useAppwrite } from 'react-appwrite'
import type { DatabaseDocumentOperation, DatabaseDocument, DatabaseCollection } from 'react-appwrite/databases/types'

/**
 * Fetches a collection from a database.
 * @param databaseId The database the collection belongs to.
 * @param collectionId The collection to fetch.
 * @param queries Queries to filter the collection by.
 * @param options Options to pass to `react-query`.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/databases?sdk=web-default#databasesListDocuments)
 */
export function useCollection<TDocument>(
  databaseId: string,
  collectionId: string,
  queries: string[] = [],
  options?: UseQueryOptions<Models.DocumentList<DatabaseDocument<TDocument>>, unknown, Models.DocumentList<DatabaseDocument<TDocument>>, (string | {
    queries: string[],
  })[]>
) {
  const { databases } = useAppwrite()
  const queryClient = useQueryClient()
  const queryKey = useMemo(() => ['appwrite', 'databases', databaseId, collectionId, { queries }], [databaseId, collectionId, queries])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      return await databases.listDocuments<DatabaseDocument<TDocument>>(databaseId, collectionId, queries)
    },

    onSuccess: collection => {
      for (const document of collection.documents) {
        queryClient.setQueryData(['appwrite', 'databases', databaseId, collectionId, 'documents', document.$id], document)
      }
    },

    ...options,
  })

  useEffect(() => {
    const unsubscribe = databases.client.subscribe(`databases.${databaseId}.collections.${collectionId}.documents`, response => {
      const [, operation] = response.events[0].match(/\.(\w+)$/) as RegExpMatchArray
      const document = response.payload as DatabaseDocument<TDocument>

      switch (operation as DatabaseDocumentOperation) {
        case 'create':
        case 'update':
        case 'delete':
          queryClient.setQueryData(['appwrite', 'databases', databaseId, collectionId, 'documents', document.$id], document)

          // This is not optimal, but is needed until this is implemented.
          // https://github.com/appwrite/appwrite/issues/2490
          queryClient.invalidateQueries({
            queryKey,
            exact: true,
          })

          break
        // case 'delete':
        //   queryClient.setQueryData<Models.DocumentList<DatabaseDocument<TDocument>>>(queryKey, collection => {
        //     if (collection?.documents) {
        //       return collection.documents.filter(storedDocument => storedDocument.$id !== document.$id)
        //     }

        //     return collection
        //   })

        //   break
      }
    })

    return unsubscribe
  }, [databaseId, collectionId, queryKey])

  return queryResult
}