import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export type Props = {
  bucketId: string,
  fileId: string,
  token?: string,
}

export function useGetFileDownload({ bucketId, fileId, token }: Props) {
  const { storage } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return storage.getFileDownload({
        bucketId,
        fileId,
        token,
      })
    },

    queryKey: ['appwrite', 'storage', 'getFileDownload', {
      bucketId,
      fileId,
      token,
    }],
  })
}
