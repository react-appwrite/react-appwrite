import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppwriteException } from 'appwrite'
import { useAppwrite } from '..'

type Props = {
  bucketId: string,
  fileId: string,
  permissions?: string[],
}

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

    retry: false,
  })

  return mutation
}