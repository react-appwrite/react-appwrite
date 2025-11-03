import { useAppwrite } from '../index'
import type { Models } from 'appwrite'
import { useQuery } from '@tanstack/react-query'

export function useGetAccountPrefs<
  Preferences extends Models.Preferences = Models.DefaultPreferences
>() {
  const { account } = useAppwrite()

  return useQuery({
    queryFn: () => account.getPrefs<Preferences>(),
    queryKey: ['appwrite', 'account', 'getPrefs'],
  })
}
