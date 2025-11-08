import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export function useListContinents() {
  const { locale } = useAppwrite()

  return useQuery<Models.ContinentList, AppwriteException>({
    queryFn: () => {
      return locale.listContinents()
    },

    queryKey: ['appwrite', 'locale', 'listContinents'],
  })
}
