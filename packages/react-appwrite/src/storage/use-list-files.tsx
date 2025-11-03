import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export type Props = {
  bucketId: string,
  queries?: string[],
  search?: string,
}

export function useListFiles({ bucketId, queries, search }: Props) {
  const { storage } = useAppwrite()

  return useQuery({
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
