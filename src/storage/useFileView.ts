'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useAppwrite } from 'react-appwrite'

/**
 * Retrieves a file URL for download, with no 'Content-Disposition: attachment' header.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/storage?sdk=web-default#storageGetFileView)
 */
export function useFileView(
  bucketId?: string,
  fileId?: string,
) {
  const { storage } = useAppwrite()
  const queryKey = useMemo(() => ['appwrite', 'storage', 'downloads', bucketId, fileId], [bucketId, fileId])
  const queryResult = useQuery<URL | null, unknown, URL | null, (string | void)[]>({
    queryKey,
    enabled: !!bucketId && !!fileId,
    queryFn: ({ queryKey: [, , , bucketId, fileId] }) => {
      if (bucketId && fileId) {
        return storage.getFileView(bucketId, fileId)
      }

      return null
    },

    cacheTime: 0,
  })

  return queryResult
}