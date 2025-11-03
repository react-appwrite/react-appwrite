import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export function useListCountriesPhones() {
  const { locale } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return locale.listCountriesPhones()
    },

    queryKey: ['appwrite', 'locale', 'listCountriesPhones'],
  })
}
