import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export type Props = {
  url: string,
  width?: number,
  height?: number,
}

export function useGetImage({ url, width, height }: Props) {
  const { avatars } = useAppwrite()

  return useQuery({
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
