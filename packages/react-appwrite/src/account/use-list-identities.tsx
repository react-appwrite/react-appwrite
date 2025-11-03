import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export type Props = {
  queries?: string[],
}

export function useListIdentities({ queries }: Props) {
  const { account } = useAppwrite()

  return useQuery({
    queryFn: () => account.listIdentities({
      queries,
    }),
    queryKey: ['appwrite', 'account', 'listIdentities', {
      queries,
    }],
  })
}
