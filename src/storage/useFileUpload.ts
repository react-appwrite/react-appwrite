'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppwrite } from 'react-appwrite'

type Props = {
  bucketId: string,
  fileId: string,
  file: File,
  permissions?: string[],
}

/**
 * Upload a file to a bucket.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/storage?sdk=web-default#storageCreateFile)
 */
export function useFileUpload() {
  const { storage } = useAppwrite()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({ bucketId, fileId, file, permissions }: Props) => {
      return await storage.createFile(bucketId, fileId, file, permissions)
    },

    onSuccess: async (file, { bucketId, fileId }) => {
      queryClient.setQueryData(['appwrite', 'storage', bucketId, fileId], file)
    },
  })

  return mutation
}