import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export function useListMfaFactors() {
  const { account } = useAppwrite()

  return useQuery({
    queryFn: () => account.listMFAFactors(),
    queryKey: ['appwrite', 'account', 'listMFAFactors'],
  })
}
