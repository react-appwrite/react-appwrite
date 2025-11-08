import { useAppwrite } from '../index'
import type { AppwriteException } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  bucketId: string,
  fileId: string,
}

export function useDeleteFile() {
  const { storage } = useAppwrite()

  return useMutation<{}, AppwriteException, Props>({
    mutationFn: ({ bucketId, fileId }) => {
      return storage.deleteFile({
        bucketId,
        fileId,
      })
    },
  })
}