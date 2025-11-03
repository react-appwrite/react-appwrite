import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export function useListCountries() {
  const { locale } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return locale.listCountries()
    },

    queryKey: ['appwrite', 'locale', 'listCountries'],
  })
}
