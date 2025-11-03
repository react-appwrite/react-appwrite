import { useAppwrite } from '../index'
import type { Models } from 'appwrite'
import { useQuery } from '@tanstack/react-query'

export function useGetAccount<
  Preferences extends Models.Preferences = Models.DefaultPreferences
>() {
  const { account } = useAppwrite()

  return useQuery({
    queryFn: () => account.get<Preferences>(),
    queryKey: ['appwrite', 'account', 'get'],
  })
}
