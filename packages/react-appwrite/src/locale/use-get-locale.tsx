import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export function useGetLocale() {
  const { locale } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return locale.get()
    },

    queryKey: ['appwrite', 'locale', 'get', {}],
  })
}
