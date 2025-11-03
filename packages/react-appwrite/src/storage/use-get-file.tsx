import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export type Props = {
  bucketId: string,
  fileId: string,
}

export function useGetFile({ bucketId, fileId }: Props) {
  const { storage } = useAppwrite()

  return useQuery({
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
