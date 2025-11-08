import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export function useGetLocale() {
  const { locale } = useAppwrite()

  return useQuery<Models.Locale, AppwriteException>({
    queryFn: () => {
      return locale.get()
    },

    queryKey: ['appwrite', 'locale', 'get', {}],
  })
}
