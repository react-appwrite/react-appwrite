import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  userId: string,
  secret: string,
  password: string,
}

export function useUpdateRecovery() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ userId, secret, password }: Props) => account.updateRecovery({
      userId,
      secret,
      password,
    }),
  })
}
