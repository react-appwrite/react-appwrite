import { useAppwrite } from '../index'
import { useMutation } from '@tanstack/react-query'

export type Props = {
  userId: string,
  email: string,
  phrase?: boolean,
}

export function useCreateEmailToken() {
  const { account } = useAppwrite()

  return useMutation({
    mutationFn: ({ userId, email, phrase }: Props) => account.createEmailToken({
      userId,
      email,
      phrase,
    }),
  })
}
