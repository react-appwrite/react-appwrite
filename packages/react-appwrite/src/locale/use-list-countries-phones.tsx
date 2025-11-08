import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export function useListCountriesPhones() {
  const { locale } = useAppwrite()

  return useQuery<Models.PhoneList, AppwriteException>({
    queryFn: () => {
      return locale.listCountriesPhones()
    },

    queryKey: ['appwrite', 'locale', 'listCountriesPhones'],
  })
}
