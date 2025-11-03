import { useAppwrite } from '../index'
import { ID } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  bucketId: string,
  fileId?: string,
  file: File,
  permissions?: string[],
}

export function useCreateFile() {
  const { storage } = useAppwrite()

  return useMutation({
    mutationFn: ({ bucketId, fileId, file, permissions }: Props) => {
      return storage.createFile({
        bucketId,
        fileId: fileId ?? ID.unique(),
        file,
        permissions,
      })
    },
  })
}
