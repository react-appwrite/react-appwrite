import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export type Props = {
  url: string,
}

export function useGetFavicon({ url }: Props) {
  const { avatars } = useAppwrite()

  return useQuery({
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
