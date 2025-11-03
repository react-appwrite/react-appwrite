import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  userId: string,
  secret: string,
}

export function useCreateSession() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ userId, secret }: Props) => account.createSession({
      userId,
      secret,
    }),
  })
}
