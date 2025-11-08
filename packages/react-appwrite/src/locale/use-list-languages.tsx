import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { Models, AppwriteException } from 'appwrite'

export function useListLanguages() {
  const { locale } = useAppwrite()

  return useQuery<Models.LanguageList, AppwriteException>({
    queryFn: () => {
      return locale.listLanguages()
    },

    queryKey: ['appwrite', 'locale', 'listLanguages'],
  })
}
