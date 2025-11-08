import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export type Props = {
  bucketId: string,
  fileId: string,
}

export function useGetFile({ bucketId, fileId }: Props) {
  const { storage } = useAppwrite()

  return useQuery<Models.File, AppwriteException>({
    queryFn: () => {
      return storage.getFile({
        bucketId,
        fileId,
      })
    },

    queryKey: ['appwrite', 'storage', 'getFile', {
      bucketId,
      fileId,
    }],
  })
}
