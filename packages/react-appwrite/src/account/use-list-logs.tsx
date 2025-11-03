import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export type Props = {
  queries?: string[],
}

export function useListLogs({ queries }: Props) {
  const { account } = useAppwrite()

  return useQuery({
    queryFn: () => account.listLogs({
      queries,
    }),
    queryKey: ['appwrite', 'account', 'listLogs', {
      queries,
    }],
  })
}
