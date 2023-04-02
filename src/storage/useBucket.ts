'use client'

import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useEffect, useMemo } from 'react'
import { useAppwrite } from 'react-appwrite'
import type { StorageFileOperation } from 'react-appwrite/storage/types'

/**
 * Fetches files from a bucket.
 * @param bucketId The bucket the files belong to.
 * @param queries Queries to filter the bucket by.
 * @param search Search term to filter the bucket by.
 * @param options Options to pass to `react-query`.
* @link [Appwrite Documentation](https://appwrite.io/docs/client/storage?sdk=web-default#storageListFiles)
 */
export function useBucket(
  bucketId: string,
  queries: string[] = [],
  search?: string,
  options?: UseQueryOptions<(Models.File)[], unknown, (Models.File)[]>
) {
  const { storage } = useAppwrite()
  const queryClient = useQueryClient()
  const queryKey = useMemo(() => ['appwrite', 'storage', bucketId, { queries }], [bucketId, queries])
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await storage.listFiles(bucketId, queries, search)

      return response.files
    },

    onSuccess: files => {
      for (const file of files) {
        queryClient.setQueryData(['appwrite', 'storage', bucketId, file.$id], file)
      }
    },

    ...options,
  })

  useEffect(() => {
    const unsubscribe = storage.client.subscribe(`buckets.${bucketId}.files`, response => {
      const [, operation] = response.events[0].match(/\.(\w+)$/) as RegExpMatchArray
      const file = response.payload as Models.File

      switch (operation as StorageFileOperation) {
        case 'create':
        case 'update':
          queryClient.setQueryData(['appwrite', 'storage', bucketId, file.$id], file)

          // This is not optimal, but is needed until this is implemented.
          // https://github.com/appwrite/appwrite/issues/2490
          queryClient.invalidateQueries({
            queryKey,
            exact: true,
          })

          break
        case 'delete':
          queryClient.setQueryData<Models.File[]>(queryKey, bucket => {
            if (bucket) {
              return bucket.filter(storedFile => storedFile.$id !== file.$id)
            }

            return bucket
          })

          break
      }
    })

    return unsubscribe
  }, [bucketId, queryKey])

  return queryResult
}