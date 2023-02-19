import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppwriteException } from 'appwrite'
import { useAppwrite } from 'react-appwrite-hooks'

type Props = {
  bucketId: string,
  fileId: string,
  file: File,
  permissions?: string[],
}

export function useFileUpload() {
  const { storage } = useAppwrite()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({ bucketId, fileId, file, permissions }: Props) => {
      return await storage.createFile(bucketId, fileId, file, permissions)
    },

    onSuccess: async (file, { bucketId, fileId }) => {
      queryClient.setQueriesData(['appwrite', 'storage', bucketId, fileId], file)
    },
  })

  return mutation
}