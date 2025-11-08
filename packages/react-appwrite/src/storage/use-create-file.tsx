import { type AppwriteMutationOptions, useAppwrite } from '../index'
import { ID, type Models, type AppwriteException } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  bucketId: string,
  fileId?: string,
  file: File,
  permissions?: string[],
}

export function useCreateFile(
  options: AppwriteMutationOptions<Models.File, Props>
) {
  const { storage } = useAppwrite()

  return useMutation<Models.File, AppwriteException, Props>({
    mutationFn: ({ bucketId, fileId, file, permissions }) => {
      return storage.createFile({
        bucketId,
        fileId: fileId ?? ID.unique(),
        file,
        permissions,
      })
    },

    ...options,
  })
}