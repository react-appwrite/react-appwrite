'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppwrite } from 'react-appwrite'

type Props = {
  bucketId: string,
  fileId: string,
}

/**
 * Delete a file by its unique ID.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/storage?sdk=web-default#storageDeleteFile)
 */
export function useFileDelete() {
  const { storage } = useAppwrite()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({ bucketId, fileId }: Props) => {
      return await storage.deleteFile(bucketId, fileId)
    },

    onSuccess: async (_, { bucketId, fileId }) => {
      queryClient.removeQueries(['appwrite', 'storage', bucketId, fileId])
    },
  })

  return mutation
}