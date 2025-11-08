import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { Flag, AppwriteException } from 'appwrite'

export type Props = {
  code: Flag,
  width?: number,
  height?: number,
  quality?: number,
}

export function useGetFlag({ code, width, height, quality }: Props) {
  const { avatars } = useAppwrite()

  return useQuery<string, AppwriteException>({
    queryFn: () => {
      return avatars.getFlag({
        code,
        width,
        height,
        quality,
      })
    },

    queryKey: ['appwrite', 'avatars', 'getFlag', {
      code,
      width,
      height,
      quality,
    }],
  })
}
