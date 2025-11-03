import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export function useListSessions() {
  const { account } = useAppwrite()

  return useQuery({
    queryFn: () => account.listSessions(),
    queryKey: ['appwrite', 'account', 'listSessions'],
  })
}
