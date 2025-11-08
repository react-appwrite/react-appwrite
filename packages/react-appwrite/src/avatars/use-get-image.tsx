import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { AppwriteException } from 'appwrite'

export type Props = {
  url: string,
  width?: number,
  height?: number,
}

export function useGetImage({ url, width, height }: Props) {
  const { avatars } = useAppwrite()

  return useQuery<string, AppwriteException>({
    queryFn: () => {
      return avatars.getImage({
        url,
        width,
        height,
      })
    },

    queryKey: ['appwrite', 'avatars', 'getImage', {
      url,
      width,
      height,
    }],
  })
}
