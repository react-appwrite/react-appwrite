import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export function useListCountries() {
  const { locale } = useAppwrite()

  return useQuery<Models.CountryList, AppwriteException>({
    queryFn: () => {
      return locale.listCountries()
    },

    queryKey: ['appwrite', 'locale', 'listCountries'],
  })
}
