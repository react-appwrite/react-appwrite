import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  userId: string,
  secret: string,
}

export function useUpdateVerification() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ userId, secret }: Props) => account.updateVerification({
      userId,
      secret,
    }),
  })
}
