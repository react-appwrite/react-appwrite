import { useAppwrite } from '../index'
import { useQuery } from '@tanstack/react-query'
import type { CreditCard } from 'appwrite'

export type Props = {
  code: CreditCard,
  width?: number,
  height?: number,
  quality?: number,
}

export function useGetCreditCard({ code, width, height, quality }: Props) {
  const { avatars } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return avatars.getCreditCard({
        code,
        width,
        height,
        quality,
      })
    },

    queryKey: ['appwrite', 'avatars', 'getCreditCard', {
      code,
      width,
      height,
      quality,
    }],
  })
}
