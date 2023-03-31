'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppwrite } from 'react-appwrite'

type Props = {
  bucketId: string,
  fileId: string,
  permissions?: string[],
}

/**
 * Update a file in a bucket.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/storage?sdk=web-default#storageUpdateFile)
 */
export function useFileUpdate() {
  const { storage } = useAppwrite()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({ bucketId, fileId, permissions }: Props) => {
      return await storage.updateFile(bucketId, fileId, permissions)
    },

    onSuccess: async (file, { bucketId, fileId }) => {
      queryClient.setQueryData(['appwrite', 'storage', bucketId, fileId], file)
    },
  })

  return mutation
}