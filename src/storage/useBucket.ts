'use client'

import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'
import { Models } from 'appwrite'
import produce, { castDraft, current } from 'immer'
import { useEffect, useMemo } from 'react'
import { useAppwrite } from 'react-appwrite'
import type { StorageFileOperation, StorageFile, StorageBucket } from 'react-appwrite/storage/types'

/**
 * Fetches a collection from a database.
 * @param bucketId The bucket the files belong to.
 * @param queries Queries to filter the bucket by.
 * @param search Search term to filter the bucket by.
 * @param options Options to pass to `react-query`.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/storage?sdk=web-default#storageListFiles)
 */
export function useBucket<TDocument>(
    bucketId: string,
    queries: string[] = [],
    search?: string,
    options?: UseQueryOptions<(TDocument & Models.File)[], unknown, (TDocument & Models.File)[], (string | {
    queries: string[];
  })[]>
) {
  const { storage } = useAppwrite()
  const queryClient = useQueryClient()
  const queryKey = useMemo(() => ['appwrite', 'buckets', bucketId, { queries }, search], [bucketId, queries, search])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await storage.listFiles<StorageFile<TDocument>>(bucketId, collectionId, queries, search)

      return response.files
    },

    onSuccess: files => {
      for (const file of files) {
        queryClient.setQueryData(['appwrite', 'buckets', bucketId, 'file', file.$id], file)
      }
    },

    ...options,
  })

  useEffect(() => {
    const unsubscribe = storage.client.subscribe(`buckets.${bucketId}.files`, response => {
      const [, operation] = response.events[0].match(/\.(\w+)$/) as RegExpMatchArray
      const file = response.payload as StorageFile<TDocument>

      switch (operation as StorageFileOperation) {
        case 'create':
        case 'update':
          queryClient.setQueryData(['appwrite', 'buckets', bucketId, 'file', file.$id], file)

          // This is not optimal, but is needed until this is implemented.
          // https://github.com/appwrite/appwrite/issues/2490
          queryClient.invalidateQueries({
            queryKey,
            exact: true,
          })

          break
        case 'delete':
          queryClient.setQueryData<StorageBucket<TDocument>>(queryKey, collection => {
            if (collection) {
              return collection.filter(storedFile => storedFile.$id !== file.$id)
            }

            return collection
          })

          break
      }
    })

    return unsubscribe
  }, [bucketId, queryKey])

  return queryResult
}