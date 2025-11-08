import { useAppwrite } from '../index'
import type { Models, AppwriteException } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  bucketId: string,
  fileId: string,
  name?: string,
  permissions?: string[],
}

export function useUpdateFile() {
  const { storage } = useAppwrite()

  return useMutation<Models.File, AppwriteException, Props>({
    mutationFn: ({ bucketId, fileId, name, permissions }) => {
      return storage.updateFile({
        bucketId,
        fileId,
        name,
        permissions,
      })
    },
  })
}