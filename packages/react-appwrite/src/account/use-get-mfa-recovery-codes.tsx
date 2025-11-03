import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export function useGetMfaRecoveryCodes() {
  const { account } = useAppwrite()

  return useQuery({
    queryFn: () => account.getMFARecoveryCodes(),
    queryKey: ['appwrite', 'account', 'getMFARecoveryCodes'],
  })
}
