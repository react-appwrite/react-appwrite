import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export type Props = {
  name?: string,
  width?: number,
  height?: number,
  background?: string,
}

export function useGetInitials({ name, width, height, background }: Props) {
  const { avatars } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return avatars.getInitials({
        name,
        width,
        height,
        background,
      })
    },

    queryKey: ['appwrite', 'avatars', 'getInitials', {
      name,
      width,
      height,
      background,
    }],
  })
}
