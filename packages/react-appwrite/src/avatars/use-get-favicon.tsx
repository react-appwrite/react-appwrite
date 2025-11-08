import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { AppwriteException } from 'appwrite'

export type Props = {
  url: string,
}

export function useGetFavicon({ url }: Props) {
  const { avatars } = useAppwrite()

  return useQuery<string, AppwriteException>({
    queryFn: () => {
      return avatars.getFavicon({
        url,
      })
    },

    queryKey: ['appwrite', 'avatars', 'getFavicon', {
      url,
    }],
  })
}
