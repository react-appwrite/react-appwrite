import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export function useListCodes() {
  const { locale } = useAppwrite()

  return useQuery<Models.LocaleCodeList, AppwriteException>({
    queryFn: () => {
      return locale.listCodes()
    },

    queryKey: ['appwrite', 'locale', 'listCodes', {}],
  })
}
