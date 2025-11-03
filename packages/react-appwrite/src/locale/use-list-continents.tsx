import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export function useListContinents() {
  const { locale } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return locale.listContinents()
    },

    queryKey: ['appwrite', 'locale', 'listContinents'],
  })
}
