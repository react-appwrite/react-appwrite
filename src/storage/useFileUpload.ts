import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppwriteContext } from '../context'
import { AppwriteException } from 'appwrite'

type Props = {
  file: File,
  permissions?: string[],
  overwrite?: boolean,
}

export function useFileUpload(
  bucketId: string,
  fileId: string,
) {
  const { storage } = useContext(AppwriteContext)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({ file, permissions, overwrite }: Props) => {
      return await storage.createFile(bucketId, fileId, file, permissions)
    },

    onSuccess: async file => {
      queryClient.setQueriesData(['appwrite', 'storage', bucketId, fileId], file)
    },

    onError: error => {
      if (error instanceof AppwriteException) {
        console.log('yes')
      }
      else {
        console.log('no', error)
      }
    }
  })

  return mutation
}