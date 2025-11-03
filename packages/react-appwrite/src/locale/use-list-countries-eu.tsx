import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export function useListCountriesEu() {
  const { locale } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return locale.listCountriesEU()
    },

    queryKey: ['appwrite', 'locale', 'listCountriesEU'],
  })
}
