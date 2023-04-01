'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useAppwrite } from 'react-appwrite'

/**
 * Retrieves a file URL for download.
 * @param bucketId The bucket the file belongs to.
 * @param fileId The unique ID of the file.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/storage?sdk=web-default#storageGetFileDownload)
 */
export function useFileDownload(
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
        return storage.getFileDownload(bucketId, fileId)
      }

      return null
    },
  })

  return queryResult
}