import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export function useListCurrencies() {
  const { locale } = useAppwrite()

  return useQuery<Models.CurrencyList, AppwriteException>({
    queryFn: () => {
      return locale.listCurrencies()
    },

    queryKey: ['appwrite', 'locale', 'listCurrencies'],
  })
}
