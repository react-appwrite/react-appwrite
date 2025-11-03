import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { Browser } from 'appwrite'

export type Props = {
  code: Browser,
  width?: number,
  height?: number,
  quality?: number,
}

export function useGetBrowser({ code, width, height, quality }: Props) {
  const { avatars } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return avatars.getBrowser({
        code,
        width,
        height,
        quality,
      })
    },

    queryKey: ['appwrite', 'avatars', 'getBrowser', {
      code,
      width,
      height,
      quality,
    }],
  })
}
