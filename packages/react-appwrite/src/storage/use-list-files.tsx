import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export type Props = {
  bucketId: string,
  queries?: string[],
  search?: string,
}

export function useListFiles({ bucketId, queries, search }: Props) {
  const { storage } = useAppwrite()

  return useQuery<Models.FileList, AppwriteException>({
    queryFn: () => {
      return storage.listFiles({
        bucketId,
        queries,
        search,
      })
    },

    queryKey: ['appwrite', 'storage', 'listFiles', {
      bucketId,
      queries,
      search,
    }],
  })
}
