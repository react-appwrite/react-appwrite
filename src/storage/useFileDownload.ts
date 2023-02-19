import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppwriteException } from 'appwrite'
import { useAppwrite } from '..'

type Props = {
  bucketId: string,
  fileId: string,
}

export function useFileDownload() {
  const { storage } = useAppwrite()
  const mutation = useMutation({
    mutationFn: async ({ bucketId, fileId, }: Props) => {
      return storage.getFileDownload(bucketId, fileId)
    },

    retry: false,
  })

  return mutation
}