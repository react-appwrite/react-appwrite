import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { AppwriteException } from 'appwrite'

export type Props = {
  bucketId: string,
  fileId: string,
  token?: string,
}

export function useGetFileView({ bucketId, fileId, token }: Props) {
  const { storage } = useAppwrite()

  return useQuery<string, AppwriteException>({
    queryFn: () => {
      return storage.getFileView({
        bucketId,
        fileId,
        token,
      })
    },

    queryKey: ['appwrite', 'storage', 'getFileView', {
      bucketId,
      fileId,
      token,
    }],
  })
}
