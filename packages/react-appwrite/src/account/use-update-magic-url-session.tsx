import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  userId: string,
  secret: string,
}

export function useUpdateMagicUrlSession() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ userId, secret }: Props) => account.updateMagicURLSession({
      userId,
      secret,
    }),
  })
}
