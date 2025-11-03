import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export function useListCodes() {
  const { locale } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return locale.listCodes()
    },

    queryKey: ['appwrite', 'locale', 'listCodes', {}],
  })
}
