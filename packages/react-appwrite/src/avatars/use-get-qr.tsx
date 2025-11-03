import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'

export type Props = {
  text: string,
  size?: number,
  margin?: number,
  download?: boolean,
}

export function useGetQr({ text, size, margin, download }: Props) {
  const { avatars } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return avatars.getQR({
        text,
        size,
        margin,
        download,
      })
    },

    queryKey: ['appwrite', 'avatars', 'getQR', {
      text,
      size,
      margin,
      download,
    }],
  })
}
