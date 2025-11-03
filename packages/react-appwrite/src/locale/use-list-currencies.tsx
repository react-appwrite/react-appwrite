import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export function useListCurrencies() {
  const { locale } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return locale.listCurrencies()
    },

    queryKey: ['appwrite', 'locale', 'listCurrencies'],
  })
}
