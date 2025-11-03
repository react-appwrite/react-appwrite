import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export function useListLanguages() {
  const { locale } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return locale.listLanguages()
    },

    queryKey: ['appwrite', 'locale', 'listLanguages'],
  })
}
